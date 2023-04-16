import Card from "./Card";

export default interface WishList {
  _id?: string;
  userId: string;
  cards: Card[];
}
