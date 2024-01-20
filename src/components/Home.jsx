import React, { useContext } from "react";
import NoteContext from "../context/note/NoteContext";
import NoteItem from "./NoteItem.jsx"


export default function Home() {
  const context = useContext(NoteContext);
  const { note, setNote } = context;
  return (
    <>
      <div className="container">
        <div className="my-3">
          <h3>Add a Note </h3>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control border-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label ">
                Password
              </label>
              <input
                type="password"
                className="form-control border-2"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input border-2"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <NoteItem/>
      </div>
    </>
  );
}
