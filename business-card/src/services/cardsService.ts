import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/cards" || "";

export function getAllCards() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
export function getSpesificCard(id: string) {
  return axios.get(`${api}/cards/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
export function addCard(newCard: Card) {
  return axios.post(api, newCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
export function editCard(id: string, cardToEdit: Card) {
  return axios.put(`${api}/${id}`, cardToEdit, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
export function deleteCard(id: string) {
  return axios.delete(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
// export function getmyCards() {
//   let userId: any = {
//     headers: {
//       Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
//         .token._id,
//     },
//   };
//   return axios.get(`${api}?userId=${userId}`);
// }
export function getMyCards(userId: string) {
  return axios.get(`${api}/${userId}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
