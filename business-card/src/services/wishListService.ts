import axios from "axios";
import Card from "../interfaces/Card";
const api: string = process.env.REACT_APP_API + "/wishlists" || "";

export function addCardToFavorites(card: Card) {
  return axios.post(api, card, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}

export function getCardsInWishList() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}

export function deleteFavoriteCard(cardId: string) {
  return axios.delete(`${api}/${cardId}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userDatas") as string)
        .token,
    },
  });
}
