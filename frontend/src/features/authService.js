import axios from "axios";
import { json } from "react-router-dom";

const API_URL = "http://localhost:5000";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/signup", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const updateUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const response = await axios.patch(API_URL + "/update", userData, config);
  console.log("resp ser", response);

  if (response.data) {
    const newData = { ...user, user: response.data.user };
    localStorage.setItem("user", JSON.stringify(newData));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  updateUser,
};

export default authService;
