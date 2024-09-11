const express = require("express");
const port = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const resultJson = fs.readFileSync("./ss.json", "utf-8");
  const result = JSON.parse(resultJson);

  const user = result.users.find((el) => el.username === username);

  if (user) {
    res.status(404);
    res.send(`user bainaa`);
    return;
  }

  result.users.push({ username, email, password });

  fs.writeFileSync("./ss.json", JSON.stringify(result));

  res.send(username);
});

app.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  const resultJson = fs.readFileSync("./ss.json", "utf-8");
  const result = JSON.parse(resultJson);

  const user = result.users.find((el) => el.username === username);

  console.log(user);

  if (!user || user.password !== password) {
    res.status(404);
    res.send(`ali neg n buruu bn`);
  }

  fs.writeFileSync("./ss.json", JSON.stringify(result));

  res.send(username);
});

app.listen(port, () => {
  console.log(`localhost:${port}`);
});
