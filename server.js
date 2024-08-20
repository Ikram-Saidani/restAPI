const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/User");

//3.configure the environment variables with .env
require("dotenv").config({ path: "./config/.env" });

//4.lunch a server with express
const app = express();

//5.connect your DB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: "restAPI" });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
connectToDB();

app.use(express.json());

//10.create four routes
//ADD A NEW USER TO THE DATABASE
app.post("/api/user/add", async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.json({ status: "success", data: newUser });
  } catch (error) {
    console.log(error);
  }
});

//RETURN ALL USERS
app.get("/api/user/all", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ status: "success", data: users });
  } catch (error) {
    console.log(error);
  }
});

//EDIT A USER BY ID
app.put("/api/user/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    res.json({ status: "success", data: user });
  } catch (error) {
    console.log(error);
  }
});

//REMOVE A USER BY ID
app.delete("/api/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.json({ status: "success", data: user });
  } catch (error) {
    console.log(error);
  }
});

//server listening
mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () =>
    console.log(`server running on port ${process.env.PORT}`)
  );
});
