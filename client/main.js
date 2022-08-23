const complimentBtn = document.getElementById("complimentBtn");
const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};
complimentBtn.addEventListener("click", getCompliment);

const fortuneBtn = document.getElementById("fortuneBtn");
const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};
fortuneBtn.addEventListener("click", getFortune);

const usersContainer = document.querySelector("#users-container");
const form = document.querySelector("form");

const userBaseURL = "http://localhost:4000/api/users";

const userCallback = ({ data: users }) => displayUsers(users);
const errCallback = (err) => console.log(err);

const getUserBtn = document.getElementById("getUserBtn");
const showUsers = () =>
  axios.get(userBaseURL).then(userCallback).catch(errCallback);
const createUser = (body) =>
  axios.post(userBaseURL, body).then(userCallback).catch(errCallback);
const deleteUser = (id) =>
  axios.delete(`${userBaseURL}/${id}`).then(userCallback).catch(errCallback);
const updateUser = (id, body) =>
  axios.put(`${userBaseURL}/${id}`, body).then(userCallback).catch(errCallback);

getUserBtn.addEventListener("click", showUsers);

function submitHandler(e) {
  e.preventDefault();

  let name = document.querySelector("#name");
  let age = document.querySelector("#age");
  let username = document.querySelector("#usrname");

  let bodyObj = {
    name: name.value,
    age: age.value,
    username: username.value,
  };

  createUser(bodyObj);

  name.value = "";
  age.value = "";
  username.value = "";
}

function updateUserBtn(id) {
  //   e.preventDefault();
  let newUsername = document.querySelector(`#newUsernameInput${id}`);

  let bodyObj = {
    newUsername: newUsername.value,
  };
  console.log(bodyObj);
  updateUser(id, bodyObj);
}

function createUserCard(user) {
  const userCard = document.createElement("div");
  userCard.classList.add("user-card");

  userCard.innerHTML = `<p class="user-info">${user.name} </p>
    <p class="user-info">${user.age}</p>
    <div>
        <p class="user-info">${user.username}</p>
        <input id="newUsernameInput${user.id}"></input>
        <button onclick="updateUserBtn(${user.id})">Update Username</button>
        </div>
    <button onclick="deleteUser(${user.id})">Delete User</button>
    `;

  usersContainer.appendChild(userCard);
}

function displayUsers(arr) {
  usersContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createUserCard(arr[i]);
  }
}

form.addEventListener("submit", submitHandler);
