import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API || "";
export function getUsers() {
  return axios.get(api);
}
export function checkUser(userToCheck: User) {
  return axios.post(`${api}/login`, userToCheck);
}

export function addUser(newUser: User) {
  return axios.post(`${api}/register`, newUser);
}

export function getUserProfile() {
  return axios.get(`${api}/me`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
