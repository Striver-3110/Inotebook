import { useState } from "react";
import NoteContext from "./NoteContext.js";
const host = "http://127.0.0.1:3001";
const NoteState = (props) => {
  let [note, setNote] = useState();

  // **Get note **********************************************************************************

  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNote(json);
  };

  // **Add note **********************************************************************************

  const addNote = async ({ title, description, tag }) => {
    // ** API call
    // console.log("hii from edit note", title, description, tag);

    try {
      const response = await fetch(`${host}/api/notes/add-note`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      getNote();
    } catch (error) {
      console.log("Error in adding the note");
    }

    // console.log(response)
    // const notes = {
    //   _id: "65a936b3j8y0wg987vad4e089e91z463015" + title.toString()?title.toString():"b",
    //   user: "65a8e86153555018dd6d74ef",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-01-18T14:33:23.654Z",
    //   __v: 0,
    // };
    // const newNote = await response.json();
    // console.log(newNote);
    // console.log(note);

    // setNote(note.concat(newNote.note));
  };

  //** */ edit note    **********************************************************************************

  const editNote = async (id, title, description, tag) => {
    try {
       const response = await fetch(`${host}/api/notes/update-note/${id}`, {
         method: "PUT",
         headers: {
           "auth-token": localStorage.getItem("token"),
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ title, description, tag }),
       });
       //** required to create copy of note because we can not change the note directly */
       const newNotes = JSON.parse(JSON.stringify(note));

       // ** traversing to note array to find the exact note to be edited
       for (let index = 0; index < note.length; index++) {
         if (newNotes[index]._id === id) {
           console.log(newNotes[index]._id, id);
           // setNote({ ...note[index], title, description, tag});
           newNotes[index].title = title;
           newNotes[index].description = description;
           newNotes[index].tag = tag;
           console.log(newNotes[index]);
           break;
         }
       }
       // console.log('updated note',newNotes);
       //** setting a note to newNotes */
       // ** required to update it in to the front-end
       setNote(newNotes);
    } catch (error) {
      console.log('Error in Updating a note');
    }
   
  };
  // **delete note  **********************************************************************************
  const deleteNote = async (id) => {
    try {
       const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
         method: "DELETE",
         headers: {
           "auth-token": localStorage.getItem("token"),
           "Content-Type": "application/json",
         },
       });
       console.log("note deleted");
       // const newNote = note.filter((noteItem) => {
       //   return noteItem && noteItem._id !== id;
       // });
       // console.log(response);

       // console.log(newNote);
       // setNote(newNote);
       getNote();
    } catch (error) {
      console.log('error in deleting a note');
    }
   
  };

  return (
    <NoteContext.Provider
      value={{ note, setNote, addNote, editNote, deleteNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
export { NoteContext };
