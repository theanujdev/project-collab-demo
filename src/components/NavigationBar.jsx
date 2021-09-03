import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/DataContext";

const NavigationBar = ({ setShowCardModal }) => {
  const { setMetaUpdate } = useContext(AppContext);
  const [showInfo, setShowInfo] = useState(false);
  const handleInfoClose = () => setShowInfo(false);
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <strong>PRO Collab</strong>
          </Navbar.Brand>
          <Nav className="justify-content-between">
            <Button
              variant="primary"
              style={{ margin: "0px 5px" }}
              onClick={() => {
                setMetaUpdate();
                setShowCardModal(true);
              }}
            >
              Create +
            </Button>

            <Button
              variant="outline-primary"
              style={{ margin: "0px 5px" }}
              onClick={() => setShowInfo(true)}
            >
              Info
            </Button>
            <Modal show={showInfo} onHide={handleInfoClose}>
              <Modal.Header closeButton>
                <Modal.Title>ℹ About this project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  This project is a simple clone of project collab/management
                  services like Jira, Trello, etc. Users can create ToDo, Doing,
                  Done tasks and update them as well. It uses HTML5 drag & drop
                  APIs to drag cards to different categories. Cards are sorted
                  according to their modified time. State of the data is
                  preserved so you don't lose anything.
                </p>
                ~ Made by Anuj Sharma
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleInfoClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Image
              style={{ margin: "0px 10px" }}
              width="35px"
              src="https://avatars.dicebear.com/api/avataaars/:seed.svg"
              roundedCircle
            />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
