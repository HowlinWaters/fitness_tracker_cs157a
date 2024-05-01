import express from "express";
import { getUsers, getUser, createUser } from "./database.js";

const app = express()

app.use(express.json())

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

app.post("/createusers", async (req, res) => {
  const { Username, Password, FName, LName, DOB, Weight, Height, Email, Avatar } =
    req.body
  const user = await createUser(
    Username,
    Password, 
    FName,
    LName,
    DOB,
    Weight,
    Height,
    Email,
    Avatar
  )
  res.status(201).send(user)
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server on port 8080");
});
