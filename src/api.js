import axios from "./http-common";

class Api {
  // logged in
  user() {
    return axios
      .get("/user")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("User error");
      });
  }

  // post comment
  postComment(comment) {
    return axios
      .post("/comment", { comment: comment })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("Post comment error");
      });
  }

  // get comments
  getComments() {
    return axios
      .get("/comments")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("Get comments error");
      });
  }
}

export default new Api();
