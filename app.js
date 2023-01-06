import express, { json } from "express";
import { promises as fs } from "fs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Docker!");
});

app.get("/users", async (req, res) => {
  const buffer = await fs.readFile("./data/users.json");
  const data = JSON.parse(buffer.toString());

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

app.get("/users/:id", async (req, res) => {
  const id = +req.params.id;

  const buffer = await fs.readFile("./data/users.json");
  const data = JSON.parse(buffer.toString());
  const user = data.find(item => item.id === id) ?? {}

  res.setHeader("Content-Type", "application/json");
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
