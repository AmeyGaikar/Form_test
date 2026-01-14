import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "./models/users";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/FormDB");

app.post("/createUser", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen("3001", () => {
  console.log("server listening on port 3001");
});
