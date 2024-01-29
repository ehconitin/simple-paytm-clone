import axios from "axios";
import authHeader from "./authHeader";

const signup = (username, password, firstName, lastName) => {
  return axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
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
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`, {
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
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
      headers: authHeaders,
    })
    .then((response) => {
      return response.data;
    });
};

const filterUsers = (filter) => {
  const authHeaders = authHeader();
  return axios
    .get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=` + filter,
      {
        headers: authHeaders,
      }
    )
    .then((response) => {
      return response.data;
    });
};

const transfer = (to, amount) => {
  const authHeaders = authHeader();
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`,
      {
        to,
        amount,
      },
      {
        headers: authHeaders,
      }
    )
    .then((response) => {
      //console.log(response);
      return response.data;
    });
};

const currentUser = () => {
  const authHeaders = authHeader();
  try {
    return axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/currentUser`, {
        headers: authHeaders,
      })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    return error;
  }
};

const update = (firstName, lastName, password) => {
  const authHeaders = authHeader();
  return axios
    .put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/`,
      {
        firstName,
        lastName,
        password,
      },
      {
        headers: authHeaders,
      }
    )
    .then((response) => {});
};
const authService = {
  signup,
  signin,
  balance,
  filterUsers,
  transfer,
  currentUser,
  update,
};

export default authService;
