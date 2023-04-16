import { FunctionComponent, useContext } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { ThemeContext } from "../../App";
import { deleteCard } from "../../services/cardsService";
import { routineMsg, successMsg } from "../../services/feedbacks";

interface DeleteCardProps {
  show: boolean;
  onHide: Function;
  id: string;
  refresh: Function;
}

const DeleteCard: FunctionComponent<DeleteCardProps> = ({
  show,
  onHide,
  id,
  refresh,
}) => {
  let theme = useContext(ThemeContext);
  return (
    <>
      <Modal show={show} onHide={() => onHide()} size="sm" centered>
        <Modal.Header
          style={{ background: theme.bgAbout }}
          className="text-light"
        >
          <Modal.Title
            style={{ color: theme.color }}
            id="contained-modal-title-vcenter"
          ></Modal.Title>
          <CloseButton
            className="mx-1"
            style={{ fontSize: "1.5em" }}
            variant={theme.bgAbout == "#fffffb" ? "black" : "white"}
            onClick={() => onHide()}
          ></CloseButton>
        </Modal.Header>
        <Modal.Body style={{ background: theme.bgAbout }}>
          <div className="text-center" style={{ color: theme.color }}>
            Are you sure do you want remove this card?
          </div>
        </Modal.Body>
        <Modal.Footer style={{ background: theme.bgAbout }}>
          <Button
            style={{ backgroundColor: "#db2b39" }}
            onClick={() => onHide()}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: theme.bgButtonNav }}
            onClick={() => {
              deleteCard(id)
                .then((res) => {
                  onHide();
                  refresh();
                  routineMsg(`Your card deleted`);
                })
                .catch((err) => console.log(err));
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCard;
