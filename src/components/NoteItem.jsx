import NoteContext from '../context/note/NoteContext'
import { useContext } from 'react'

export default function NoteItem (props) {
  //** Instantiating the NoteContext */ in order to get all the required methods and objects given below
  /** 
    {
  note, setNote, addNote, editNote, deleteNote, getNote
}

   */
  const context = useContext(NoteContext)

  //** delete note of the context which is directly called at this component */
  const { deleteNote } = context
  const { noteItem, updateNote, showAlert } = props

  return (
    <div className='col-md-3 my-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center gap-3'>
            <h5 className='card-title'>{noteItem.title}</h5>
            <i
              className='fa-solid fa-trash-can'
              onClick={() => {
                deleteNote(noteItem._id);
                showAlert({type:'success',message:'Note deleted successfully!'})
              }}
            ></i>
            <i
              className='fa-regular fa-pen-to-square'
              onClick={() => {
                updateNote(noteItem)
              }}
            ></i>
          </div>
          <p className='card-text'>{noteItem.description}</p>
          <p className='card-text'>{noteItem.tag}</p>
        </div>
      </div>
    </div>
  )
}
