import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Cards from "./Cards";
import { useContext } from "react";
import { AppContext } from "../contexts/DataContext";

const ContainerBox = ({ title }) => {
  const { dragging, setToDo, setDoing, setDone, ...data } =
    useContext(AppContext);
  const replaceCard = (newCategory, draggedEl) => {
    let updatedArr = [...data[newCategory]];
    let oldArr = data[draggedEl.dataset.category].filter(
      (item) => item.date !== draggedEl.dataset.date
    );

    let cardData = data[draggedEl.dataset.category].find((obj) => {
      return obj.date === draggedEl.dataset.date;
    });
    cardData.date = new Date().toString();
    cardData.category = newCategory;
    updatedArr.push(cardData);

    // delete from previous category
    switch (draggedEl.dataset.category) {
      case "ToDo":
        setToDo(oldArr);
        break;
      case "Doing":
        setDoing(oldArr);
        break;
      case "Done":
        setDone(oldArr);
        break;
      default:
        break;
    }

    switch (newCategory) {
      case "ToDo":
        setToDo(updatedArr);
        break;
      case "Doing":
        setDoing(updatedArr);
        break;
      case "Done":
        setDone(updatedArr);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Card style={{ marginBottom: "30px" }}>
        <Card.Header>
          <strong style={{ color: "purple" }}>⭐ {title}</strong>
        </Card.Header>
        <Card.Body
          data-title={title}
          data-draggable={true}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
              e.currentTarget.dataset.title !==
              dragging.current.dataset.category
            ) {
              replaceCard(e.currentTarget.dataset.title, dragging.current);
            }
          }}
        >
          <Container>
            <Row>
              {data[title].length === 0
                ? "Empty"
                : data[title].map(({ title, desc, date, category }) => (
                    <Col
                      xs={12}
                      key={date}
                      data-category={category}
                      data-date={date}
                      draggable={true}
                      onDragStart={(e) => {
                        dragging.current = e.target;
                      }}
                      onDragEnd={() => {
                        dragging.current = null;
                      }}
                    >
                      <Cards
                        title={title}
                        desc={desc}
                        category={category}
                        date={date}
                      />
                    </Col>
                  ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default ContainerBox;
