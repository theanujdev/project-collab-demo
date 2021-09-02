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
                  This project is a demo of project collab/management like
                  services like Jira, Trello, etc.
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
