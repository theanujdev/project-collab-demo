import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../contexts/DataContext";
import { useRef } from "react";

const CardModal = ({ show, handleHide }) => {
  const { setToDo, setDoing, setDone, metaUpdate } = useContext(AppContext);
  const data = useContext(AppContext);
  const [validated, setValidated] = useState({ title: true, desc: true });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const refCategory = useRef();

  useEffect(() => {
    if (metaUpdate) {
      for (const obj of data[metaUpdate.category]) {
        if (obj.date.toString() === metaUpdate.date) {
          setTitle(obj.title);
          setDesc(obj.desc);
          refCategory.current.value = metaUpdate.category;
        }
      }
    } else {
      setTitle("");
      setDesc("");
    }
  }, [show, metaUpdate]);

  // const sortDate = ()=>{

  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[a-zA-Z]+$/.test(title)) {
      setValidated({ ...validated, title: false });
      return;
    }
    setValidated({ ...validated, title: true });

    if (desc.length < 25) {
      setValidated({ ...validated, desc: false });
      return;
    }
    setValidated({ ...validated, desc: true });

    if (metaUpdate) {
      for (const i in data[metaUpdate.category]) {
        if (data[metaUpdate.category][i].date === metaUpdate.date) {
          let updatedArr = [...data[refCategory.current.value]];
          let newData = {
            title,
            desc,
            date: new Date().toString(),
            category: refCategory.current.value,
          };

          // if user has updated the category, delete from previous category
          if (metaUpdate.category !== refCategory.current.value) {
            updatedArr.push(newData);
            switch (metaUpdate.category) {
              case "ToDo":
                setToDo((prev) =>
                  prev.filter((item) => item.date !== metaUpdate.date)
                );
                break;
              case "Doing":
                setDoing((prev) =>
                  prev.filter((item) => item.date !== metaUpdate.date)
                );
                break;
              case "Done":
                setDone((prev) =>
                  prev.filter((item) => item.date !== metaUpdate.date)
                );
                break;
              default:
                break;
            }
          } else {
            updatedArr[i] = newData;
          }

          // update in the new category
          switch (refCategory.current.value) {
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
        }
      }
      handleHide();
      return;
    }

    switch (refCategory.current.value) {
      case "ToDo":
        setToDo((prev) =>
          [...prev].concat({
            title,
            desc,
            date: new Date().toString(),
            category: "ToDo",
          })
        );
        break;
      case "Doing":
        setDoing((prev) =>
          [...prev].concat({
            title,
            desc,
            date: new Date().toString(),
            category: "Doing",
          })
        );
        break;
      case "Done":
        setDone((prev) =>
          [...prev].concat({
            title,
            desc,
            date: new Date().toString(),
            category: "Done",
          })
        );
        break;

      default:
        break;
    }

    handleHide();
  };

  return (
    <>
      <Modal
        show={show}
        fullscreen="sm-down"
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {metaUpdate ? "Update Card" : "Create Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Task 1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!validated.title}
              />
              <Form.Control.Feedback type="invalid">
                It should only contain alphabets.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Work on task 1"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: "150px" }}
                isInvalid={!validated.desc}
              />
              <Form.Control.Feedback type="invalid">
                It should be minimum 25 characters.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSelect"
              label="Category"
              className="mb-3"
            >
              <Form.Select
                aria-label="Floating label select example"
                ref={refCategory}
              >
                <option value="ToDo">ToDo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </Form.Select>
            </FloatingLabel>
            <Modal.Footer>
              <Button type="submit">{metaUpdate ? "Update" : "Create"}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardModal;
