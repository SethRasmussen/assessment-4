const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
  getCompliment,
  getFortune,
  getUsers,
  createUser,
  deleteUser,
  updateUser
} = require("./controller");

//Endpoints
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

app.get("/api/users", getUsers);
app.post("/api/users", createUser);
app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser)

//bottom
app.listen(4000, () => console.log("Server running on 4000"));
