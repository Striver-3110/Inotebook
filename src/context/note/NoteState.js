import { useState } from "react";
import NoteContext  from './NoteContext.js';
const NoteState = (props) => {
  const noteInitial = [
    {
      _id: "65a936b3ad4e089e91463015",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:33:23.654Z",
      __v: 0,
    },
    {
      _id: "65a937250b78068acb3eb0e4",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:17.359Z",
      __v: 0,
    },
    {
      _id: "65a937260b78068acb3eb0e6",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:18.677Z",
      __v: 0,
    },
    {
      _id: "65a936b3ad4e089e91463015",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:33:23.654Z",
      __v: 0,
    },
    {
      _id: "65a937250b78068acb3eb0e4",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:17.359Z",
      __v: 0,
    },
    {
      _id: "65a937260b78068acb3eb0e6",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:18.677Z",
      __v: 0,
    },
    {
      _id: "65a936b3ad4e089e91463015",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:33:23.654Z",
      __v: 0,
    },
    {
      _id: "65a937250b78068acb3eb0e4",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:17.359Z",
      __v: 0,
    },
    {
      _id: "65a937260b78068acb3eb0e6",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:18.677Z",
      __v: 0,
    },
    {
      _id: "65a936b3ad4e089e91463015",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:33:23.654Z",
      __v: 0,
    },
    {
      _id: "65a937250b78068acb3eb0e4",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:17.359Z",
      __v: 0,
    },
    {
      _id: "65a937260b78068acb3eb0e6",
      user: "65a8e86153555018dd6d74ef",
      title: "1st note",
      description: "jay khodiyar",
      tag: "check",
      date: "2024-01-18T14:35:18.677Z",
      __v: 0,
    },
  ];

  const [note, setNote] = useState(noteInitial);
 
  return (
    <NoteContext.Provider value={{note:note, setNote:setNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
export { NoteContext };
