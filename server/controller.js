const users = require("./db.json");
let curId = 4;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "A friend asks only for your time not your money.",
      "A lifetime of happiness lies ahead of you.",
      "A light heart carries you through all the hard times.",
      "An important person will offer you support.",
      "An inch of time is an inch of gold.",
    ];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
  },

  getUsers: (req, res) => {
    console.log(users);
    res.status(200).send(users);
  },

  createUser: (req, res) => {
    console.log(req.body);
    // const { name } = req.body.name;
    // const { age } = req.body.age;
    // const { username } = req.body.username;
    req.body.id = curId;
    curId++;
    users.push(req.body);
    res.status(200).send(users);
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    console.log("this id is " + id);
    const index = users.findIndex((x) => x.id === +id);
    console.log(index);
    users.splice(index, 1);
    res.status(200).send(users);
  },

  updateUser: (req, res) => {
    const { id } = req.params;
    const { newUsername } = req.body;
    console.log(id)
    console.log(newUsername)
    const index = users.findIndex((x) => x.id === +id);
    console.log(users[index].username)
    users[index].username = newUsername;
    console.log(users[index]);
    res.status(200).send(users);
  },
};
