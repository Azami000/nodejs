// const express = require("express");

// const port = 8000;
// const app = express();

// app.use(express.json());

// app.get("/", (request, response) => {
//   response.send("Successfully intialized the express rest api");
// });
// app.post("/", (req, res) => {
//   res.send("post request is successfully.");
// });
// app.put("/", (req, res) => {
//   res.send("Put request is successfully.");
// });
// app.delete("/", (req, res) => {
//   res.send("Delete request is successfully.");
// });
// app.listen(port, () => {
//   console.log(`localhost${port}`);
// });

const express = require("express");
const port = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const DbModel = {
  users: [
    {
      userId: String,
      username: String,
      profilePic: String,
    },
  ],
  posts: [
    {
      postId: String,
      userId: String,
      title: String,
      description: String,
      image: String,
      publishedAt: Date,
    },
  ],
};

app.get("/users", (req, res) => {
  const resultJson = fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const postId = uuidv4();
  const publishedAt = new Date().toISOString();

  const user = result.users.find((el) => el.userId === id);
  if (!user) {
    res.status(404);
    res.send(`user not found following id = ${id}`);
    return;
  }

  res.send(user);

  result.res.send(result);
});
app.get("posts/", async (req, res) => {
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  console.log(result);

  res.send(result.posts);
});
app.get("/posts:id", (req, res) => {
  const { id } = req.params;
  const resultJson = fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const user = result.posts.find((el) => el.userId === id);

  if (!user) {
    res.status(404);
    res.send(`user not found following id=${id}`);
    return;
  }
  res.send(user);
});

app.delete("/delete", (req, res) => {
  // const { comments, posts, userId } = req.body;

  const { postId } = req.body;
  const resultJson = fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const publishedAt = new Date().toISOString();

  const deletePost = result.posts.filter((el) => el.postId !== postId);
  result.posts = deletePost;

  fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  res.send("Succesfully deleted");
});
app.delete("/deletecomment", (req, res) => {
  const { commentId } = req.body;
  const resultJson = fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const publishedAt = new Date().toISOString();

  const deleteComment = result.comments.filter(
    (el) => el.commentId !== commentId
  );
  result.comments = deleteComment;
  fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  console.log(deleteComment);

  res.send("Succesfully com deleted");
});



app.get;
app.listen(port, () => {
  console.log(`localhost:${port}`);
});
