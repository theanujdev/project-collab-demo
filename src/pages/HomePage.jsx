import ContainerBox from "../components/ContainerBox";
import NavigationBar from "../components/NavigationBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardModal from "../components/CardModal";
import { useContext } from "react";
import { AppContext } from "../contexts/DataContext";

const HomePage = () => {
  const { setShowCardModal } = useContext(AppContext);

  return (
    <>
      <NavigationBar setShowCardModal={setShowCardModal} />
      <Container fluid style={{ padding: "30px 50px" }}>
        <Row xs={1} md={2} lg={3} style={{ justifyContent: "center" }}>
          <Col>
            <ContainerBox title="ToDo" />
          </Col>
          <Col>
            <ContainerBox title="Doing" />
          </Col>
          <Col>
            <ContainerBox title="Done" />
          </Col>
        </Row>
      </Container>
      <CardModal />
    </>
  );
};

export default HomePage;
