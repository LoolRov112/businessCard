import { FunctionComponent, useContext, useEffect, useState } from "react";

import { ThemeContext } from "../../App";
import Card from "../../interfaces/Card";
import { errorMsg, successMsg } from "../../services/feedbacks";
import { getUserProfile } from "../../services/userService";
import {
  addCardToFavorites,
  deleteFavoriteCard,
} from "../../services/wishListService";

interface CardComponentProps {
  card: Card;
  setUpdateModal: Function;
  setDeleteModal: Function;
  setId: Function;
  isBusiness: boolean;
}

const CardComponent: FunctionComponent<CardComponentProps> = ({
  card,
  setUpdateModal,
  setDeleteModal,
  setId,
  isBusiness,
}) => {
  let theme = useContext(ThemeContext);
  let [userId, setUserId] = useState<string>("");
  let [canEdit, setCanEdit] = useState<boolean>(false);
  let [isAddedToFavorite, setIsAddedToFavorite] = useState<boolean>(false);

  useEffect(() => {
    getUserProfile()
      .then((res) => setUserId(res.data._id))
      .catch((err) => console.log(err));

    if (localStorage.getItem(card._id as string) === "true") {
      setIsAddedToFavorite(true);
    } else {
      setIsAddedToFavorite(false);
    }
  }, [card._id]);

  const handleAddToFavs = () => {
    if (!isAddedToFavorite) {
      addCardToFavorites(card)
        .then(() => {
          setIsAddedToFavorite(true);
          localStorage.setItem(card._id as string, "true");
          successMsg(`Your ${card.name} added to favorites`);
        })
        .catch((err) => {
          console.log(err);
          errorMsg(
            `You have reached the maximum limit of ${card.name} cards in your wishlist`
          );
        });
    } else {
      deleteFavoriteCard(card._id as string)
        .then(() => {
          successMsg(`Your ${card.name} removed from favorites`);
          localStorage.removeItem(card._id as string);
          setIsAddedToFavorite(false);
        })
        .catch((err) => {
          console.log(err);
          errorMsg(`Failed to remove ${card.name} from favorites`);
        });
    }
  };

  useEffect(() => {
    if (userId == card.userId) {
      setCanEdit(true);
    }
  }, [userId]);

  return (
    <>
      <div
        onDoubleClick={handleAddToFavs}
        id="cardTransition"
        key={card._id}
        className="card col-md-3 mx-3 my-5 text-center"
        style={{
          width: "18rem",
          background: theme.bgCard,
          boxShadow: theme.shadow,
        }}
      >
        <img
          src={card.image}
          style={{ width: "14rem" }}
          className="card-img-top mx-3 mt-1"
          alt={card.name}
        />
        <div className="card-body">
          <h5 style={{ fontSize: "2rem", color: theme.color }}>{card.name}</h5>
          <p style={{ fontSize: "1.5em", color: theme.color }}>
            {card.description}
          </p>
          <hr />
          <p className="card-text" style={{ color: theme.color }}>
            {card.phone}
          </p>
          <hr />
          <p className="card-text" style={{ color: theme.color }}>
            {card.address}
          </p>

          {isBusiness && (
            <>
              <hr />
              <div>
                {canEdit && (
                  <>
                    <i
                      style={{ color: theme.editColor, cursor: "pointer" }}
                      className="fa-regular fa-pen-to-square mx-3"
                      onClick={() => {
                        setUpdateModal(true);
                        setId(card._id as string);
                      }}
                    ></i>
                    <i
                      style={{ color: theme.deleteColor, cursor: "pointer" }}
                      className="fa-regular fa-trash-can mx-3"
                      onClick={() => {
                        setDeleteModal(true);
                        setId(card._id as string);
                      }}
                    ></i>
                  </>
                )}
              </div>
            </>
          )}
          <div className="my-3">
            <i
              className={
                isAddedToFavorite
                  ? "fa-solid fa-heart display-5 text-danger"
                  : "fa-regular fa-heart display-5"
              }
              onClick={handleAddToFavs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
