import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import Card from "../interfaces/Card";
import { routineMsg } from "../services/feedbacks";
import {
  deleteFavoriteCard,
  getCardsInWishList,
} from "../services/wishListService";

interface WishListProps {
  cardChanged: boolean;
  refresh: Function;
}

const WishList: FunctionComponent<WishListProps> = ({
  cardChanged,
  refresh,
}) => {
  let theme = useContext(ThemeContext);
  let [id, setId] = useState<string>("");
  let [likedCards, setLikedCards] = useState<Card[]>([]);

  useEffect(() => {
    getCardsInWishList()
      .then((res) => {
        return setLikedCards(res.data);
      })
      .catch((err) => console.log(err));
  }, [cardChanged]);
  return (
    <>
      <div className="container w-100">
        <table className="table border text-center">
          <thead>
            <tr>
              <th style={{ color: theme.color }}>Name</th>
              <th style={{ color: theme.color }}>Description</th>
              <th style={{ color: theme.color }}>Address</th>
              <th style={{ color: theme.color }}>Phone</th>
              <th style={{ color: theme.color }}>Image</th>
              <th style={{ color: theme.color }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            <>
              {likedCards.length ? (
                likedCards.map((card) => {
                  return (
                    <tr key={card.name}>
                      <td
                        style={{ color: theme.color, verticalAlign: "middle" }}
                      >
                        {card.name}
                      </td>
                      <td
                        style={{ color: theme.color, verticalAlign: "middle" }}
                      >
                        {card.description}
                      </td>
                      <td
                        style={{ color: theme.color, verticalAlign: "middle" }}
                      >
                        {card.address}
                      </td>
                      <td
                        style={{ color: theme.color, verticalAlign: "middle" }}
                      >
                        {card.phone}
                      </td>
                      <td
                        style={{ color: theme.color, verticalAlign: "middle" }}
                      >
                        <img
                          src={card.image}
                          style={{ height: "10rem", width: "10rem" }}
                          alt={card.name}
                        />
                      </td>
                      <td
                        style={{ color: theme.color, verticalAlign: "middle" }}
                      >
                        <i
                          id="deleteFavCard"
                          style={{
                            color: theme.color,
                          }}
                          className="fa-solid fa-xmark"
                          onClick={() => {
                            deleteFavoriteCard(card._id as string)
                              .then((res) => {
                                setId(card._id as string);
                                refresh();
                                routineMsg(
                                  `Your ${card.name} card deleted from your favorites`
                                );
                                localStorage.removeItem(card._id as string);
                              })
                              .catch((err) => console.log(err));
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h4 style={{ color: theme.color }}>There are no cards</h4>
              )}
            </>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WishList;
