const express = require("express");
const path = require("path");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

const app = express();
const port = 8080;

const dotenv = require('dotenv');
dotenv.config();

app.use("/", express.static(path.join(__dirname, "dist")));

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:8080",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("api/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/api/user", (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const Comment = db.comment;

app.post("/api/comment", async (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(400).send("Invalid user");
  }
  const comment = new Comment({
    comment: req.body.comment,
    name: req.oidc.user["https://cattttttttapp.com/username"],
  });

  // https://stackoverflow.com/questions/19065615/how-to-delete-n-numbers-of-documents-in-mongodb
  try {
    // count
    let count = await Comment.find().count();

    // delete
    if (count >= 3) {
      let toDel = [];
      let delNum = count - 2;
      let toDelData = await Comment.find().limit(delNum);
      toDel = Array.from(toDelData, (e) => e._id);
      await Comment.deleteMany({ _id: { $in: toDel } });
    }

    // save
    await comment.save(comment);

    res.send("Comment posted");

    // error
  } catch (err) {
    res.status(500).send("Comment update error");
  }
});

app.get("/api/comments", (req, res) => {
  Comment.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send("Comment update error");
    });
});

// sendFile will go here
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port);
// console.log("Server started at http://localhost:" + port);
