module.exports = mongoose => {
  const Comment = mongoose.model(
    "comment",
    mongoose.Schema(
      {
        comment: String,
        name: String,
      },
      { timestamps: true }
    )
  );

  return Comment;
};
