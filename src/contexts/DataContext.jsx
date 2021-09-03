import { createContext, useEffect, useState, useRef } from "react";

export const AppContext = createContext();

const DataContext = ({ children }) => {
  const [ToDo, setToDo] = useState(
    JSON.parse(localStorage.getItem("ToDo")) || []
  );
  const [Doing, setDoing] = useState(
    JSON.parse(localStorage.getItem("Doing")) || []
  );
  const [Done, setDone] = useState(
    JSON.parse(localStorage.getItem("Done")) || []
  );

  const [metaUpdate, setMetaUpdate] = useState();
  const [showCardModal, setShowCardModal] = useState(false);
  const dragging = useRef(null);

  useEffect(() => {
    localStorage.setItem("ToDo", JSON.stringify(ToDo));
  }, [ToDo]);
  useEffect(() => {
    localStorage.setItem("Doing", JSON.stringify(Doing));
  }, [Doing]);
  useEffect(() => {
    localStorage.setItem("Done", JSON.stringify(Done));
  }, [Done]);

  return (
    <AppContext.Provider
      value={{
        ToDo,
        setToDo,
        Doing,
        setDoing,
        Done,
        setDone,
        metaUpdate,
        setMetaUpdate,
        showCardModal,
        setShowCardModal,
        dragging,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default DataContext;
