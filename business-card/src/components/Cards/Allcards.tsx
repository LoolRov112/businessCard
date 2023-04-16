import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../../interfaces/Card";
import { getAllCards } from "../../services/cardsService";
import CardComponent from "./CardComponent";
import DeleteCard from "../Modals/DeleteCard";
import UpdateCardModal from "../Modals/UpdateCardModal";
import { ThemeContext } from "../../App";

interface AllcardsProps {
  cardChanged: boolean;
  refresh: Function;
  isBusiness: boolean;
}

const Allcards: FunctionComponent<AllcardsProps> = ({
  cardChanged,
  refresh,
  isBusiness,
}) => {
  let theme = useContext(ThemeContext);

  let [deleteModal, setDeleteModal] = useState<boolean>(false);
  let [updateModal, setUpdateModal] = useState<boolean>(false);
  let [canEdit, setCanEdit] = useState<boolean>(isBusiness);
  let [id, setId] = useState<string>("");
  let [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, [cardChanged, canEdit]);
  return (
    <>
      <div
        className="container mt-3 "
        style={{ backgroundColor: theme.backGroundComps }}
      >
        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <CardComponent
                isBusiness={isBusiness}
                card={card}
                setUpdateModal={setUpdateModal}
                setDeleteModal={setDeleteModal}
                setId={setId}
              />
            ))
          ) : (
            <h4>Theres no cards</h4>
          )}
        </div>
      </div>
      <UpdateCardModal
        onHide={() => setUpdateModal(false)}
        refresh={refresh}
        id={id}
        show={updateModal}
      ></UpdateCardModal>
      <DeleteCard
        refresh={refresh}
        id={id}
        onHide={() => setDeleteModal(false)}
        show={deleteModal}
      ></DeleteCard>
    </>
  );
};

export default Allcards;
