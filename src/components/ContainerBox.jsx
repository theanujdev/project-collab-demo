import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Cards from "./Cards";
import { useContext } from "react";
import { AppContext } from "../contexts/DataContext";

const ContainerBox = ({ title }) => {
  const data = useContext(AppContext);

  return (
    <>
      <Card style={{ marginBottom: "30px" }}>
        <Card.Header>
          <strong style={{ color: "purple" }}>⭐ {title}</strong>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              {data[title].length === 0
                ? "Empty"
                : data[title].map(({ title, desc, date, category }) => (
                    <Col xs={12} key={date.toString()}>
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
