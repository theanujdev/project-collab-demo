import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AppContext } from "../contexts/DataContext";

const Cards = ({ title, desc, category, date }) => {
  const { setMetaUpdate, setShowCardModal } = useContext(AppContext);
  const handleCardClick = (e) => {
    setMetaUpdate({
      date: e.currentTarget.dataset.date,
      category: e.currentTarget.dataset.category,
    });
    setShowCardModal(true);
  };
  return (
    <>
      <Card
        style={{ margin: "10px 0px" }}
        data-category={category}
        data-date={date}
        onClick={handleCardClick}
      >
        <Button variant="light">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{desc}</Card.Text>
          </Card.Body>
        </Button>
      </Card>
    </>
  );
};

export default Cards;
