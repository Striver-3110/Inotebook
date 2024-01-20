import { useContext } from "react";
import NoteContext from "../context/note/NoteContext";

export default function NoteItem() {
  const context = useContext(NoteContext);
  const { note, setNote } = context;
  return (
    <div>
      <div className=" row my-3">
              <h3>My Notes</h3>
              
              {note.map((note) => {
                  return (
                    <div className="col-md-3 my-3">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">{note.title}</h5>
                          <p class="card-text">{note.description}</p>
                          <a href="#" class="btn btn-primary">
                            Go somewhere
                          </a>
                        </div>
                      </div>
                    </div>
                  );
              })}
        
      </div>
    </div>
  );
}
