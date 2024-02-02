import React, { useContext, useState } from 'react'
import NoteContext from '../context/note/NoteContext'


// ** to understand logic of any method jump to Notes.jsx
export default function AddNote(props) {
  const { showAlert } = props;// this showAlert takes an object alert contains type and message
  const context = useContext(NoteContext)
  const { addNote } = context
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: 'default'
  })

  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addNote(note);
    setNote({ title: '', description: '', tag: '' }); // reset the form after submitting a note
    showAlert({ type:'success', message:"Your note has been added successfully!"});
  }
  return (
    <>
      <div className='my-3'>
        <h3>Add a Note </h3>
        <form>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              value={note.title}
              onChange={onChange}
              required
              minLength={5}
              type='text'
              className='form-control border-2'
              id='title'
              name='title'
              aria-describedby='emailHelp'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label '>
              description
            </label>
            <input
              value={note.description}
              minLength={5}
              required
              onChange={onChange}
              type='text'
              className='form-control border-2'
              id='description'
              name='description'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Tag
            </label>
            <input
              value={note.tag}
              onChange={onChange}
              type='text'
              className='form-control border-2'
              id='tag'
              name='tag'
              aria-describedby='tag'
            />
          </div>
          <button
            // disabled={`${note.title.length === 0 || note.description.length === 0}`}
            type='submit'
            className='btn btn-primary'
            onClick={handleSubmit}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  )
}
