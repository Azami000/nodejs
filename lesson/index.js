import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { writeFileSync, readFileSync } from "fs";

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
const tokenSecret = "key";

app.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;

  const dbJson = readFileSync("./us.json", "utf-8");
  const db = JSON.parse(dbJson);

  const user = db.users.find((el) => el.username === username);

  if (user) {
    res.status(404);
    res.send(`user bainaa`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.users.push({
    username,
    password: hashedPassword,
  });

  writeFileSync("./us.json", JSON.stringify(db), "utf-8");
  res.send({ message: "Success", jwt: "123" });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const dbJson = readFileSync("./us.json", "utf-8");
  const db = JSON.parse(dbJson);

  const isMatch = await bcrypt.compare(password, username);

  if (!isMatch) {
    res.status(200).send("username or password is nothing");
    return;
  }

  const token = jwt.sign({ username: result.username }, tokenSecret, {
    expiresIn: "5m",
  });
  res.status(200).send({ username, token });

  app.post("/refresh", async (req, res) => {
    const { token } = req.body;
    const decryptedToken = jwt.verify(token, tokenSecret);
    res.status(200).send({ decryptedToken });
  });
});
app.get("/usersss", async (req, res) => {
  const resultJson = await readFileSync("./us.json", "utf-8");
  const result = JSON.parse(resultJson);
  console.log(result);

  res.send(result.users);
});

app.listen(port, () => console.log(`htpp://localhost:${port}`));
