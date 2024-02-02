import React, { useContext } from "react";
import NoteContext from "../context/note/NoteContext";
import Notes from "./Notes.jsx";
// import { useNavigation } from "react-router-dom";


export default function Home(props) {
  // const navigate = useNavigation();
  const { showAlert } = props;
  return (
    <>
      <div className="container">
        <div className=" row my-3">
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
}
