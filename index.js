const express = require("express");

const port = 8000;
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Successfully intialized the express rest api");
});
app.post("/", (req, res) => {
  res.send("post request is successfully.");
});
app.put("/", (req, res) => {
  res.send("Put request is successfully.");
});
app.delete("/", (req, res) => {
  res.send("Delete request is successfully.");
});
app.listen(port, () => {
  console.log(`localhost${port}`);
});
