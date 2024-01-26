import axios from "axios";
import authHeader from "./authHeader";

const signup = (username, password, firstName, lastName) => {
  return axios
    .post("http://localhost:3000/api/v1/user/signup", {
      username,
      password,
      firstName,
      lastName,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const signin = (username, password) => {
  return axios
    .post("http://localhost:3000/api/v1/user/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const balance = () => {
  const authHeaders = authHeader();
  return axios
    .get("http://localhost:3000/api/v1/account/balance", {
      headers: authHeaders,
    })
    .then((response) => {
      return response.data;
    });
};

const filterUsers = (filter) => {
  return axios
    .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
    .then((response) => {
      return response.data;
    });
};

const transfer = (to, amount) => {
  const authHeaders = authHeader();
  return axios
    .post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to,
        amount,
      },
      {
        headers: authHeaders,
      }
    )
    .then((response) => {
      console.log(response);
    });
};
const authService = {
  signup,
  signin,
  balance,
  filterUsers,
  transfer,
};

export default authService;
