import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteItem from './NoteItem.jsx'
import NoteContext from '../context/note/NoteContext'
import AddNote from './AddNote.jsx'
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

export default function Notes (props) {
  const navigate = useNavigate()
  const { showAlert } = props
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }

  //** Instantiating the NoteContext */ in order to get all the required methods and objects given below
  /** 
    {
  note, setNote, addNote, editNote, deleteNote, getNote
}

   */
  const context = useContext(NoteContext)

  //** getting the required methods from NoteContext */
  const { note, getNote, editNote } = context

  // ** useState for opening and closing the modal
  const [open, setOpen] = useState(false)
  //** useState for updating the note present in the front-end */
  //** i.e. as i type something on keyboard it should replicate the same on the modal present on the screen  */
  const [newNote, setNewNote] = useState({
    id: '', //** forgot to add id  */
    etitle: '',
    edescription: '',
    etag: ''
  })

  //** instantiating the useRef hook in order to reference the '''open Modal''' button open the modal */
  //** the button is hidden from the ui */
  //** and is clicked programmatically using the updateNote method*/
  const ref = useRef()

  // ** useEffect hook is used to fetch the data from the database
  // ** using the getNote method  remember that this will work only once when the Notes component is loaded on the screen
  useEffect(() => {
    try {
      const fetchData = async () => {
        await getNote()
      }
      if (localStorage.getItem('token')) {
        fetchData()
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log('error:', error);
    }
    const fetchData = async () => {
      await getNote()
    }
    if (localStorage.getItem('token')) {
      fetchData()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  // ** onChange in reference is used to update all the fields of the modal instantly as soon as you write something into the input
  //** which in reference uses useState hook defined above at line 41 */
  const onChange = e => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value })
  }

  //** Submit button of the modal is handled using this method* /
  //** which internally calles editNote method to make Api call to update the note */
  const handleSubmit = e => {
    e.preventDefault() // prevents the page from reload
    // console.log("hii from modal",newNote)

    //** editNote is a method of NoteContext used to make http req which internally call   * /
    //** /api/notes/update-note/:id  api present in the backend/notes.js * /
    editNote(newNote.id, newNote.etitle, newNote.edescription, newNote.etag)
    handleClose()
    showAlert({ type: 'success', message: 'Note updated successfully!' })
    // addNote(note)
  }

  // used to open the modal
  const handleOpen = () => {
    setOpen(true)
    // console.log(newNote);
  }

  // ** edit button handler

  const updateNote = UpdateNote => {
    // console.log('edit button pressed')

    //** programmatic click on the openModal button of the Modal */
    ref.current.click()

    //** setting the newNote  in order the get the current title,tag,desc in modal*/
    setNewNote({
      id: UpdateNote._id,
      etitle: UpdateNote.title,
      edescription: UpdateNote.description,
      etag: UpdateNote.tag
    })

    handleOpen()
    // console.log(newNote);
    // openModal()
  }
  // to close the modal
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {/* form present at the top */}
      <AddNote showAlert={showAlert} />
      {/* Modal as a whole */}
      <Button className='d-none' ref={ref}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id='parent-modal-title'>Edit Note</h2>
          {/*****************************************************  Form    *************************************************************/}
          <form>
            <div className='mb-3'>
              <label htmlFor='etitle' className='form-label'>
                Title
              </label>
              <input
                minLength={5}
                required
                value={newNote.etitle}
                onChange={onChange}
                type='text'
                className='form-control border-2'
                id='etitle'
                name='etitle'
                aria-describedby='etitle'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='edescription' className='form-label '>
                description
              </label>
              <input
                minLength={5}
                required
                value={newNote.edescription}
                onChange={onChange}
                type='text'
                className='form-control border-2'
                id='edescription'
                name='edescription'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='etitle' className='form-label'>
                Tag
              </label>
              <input
                value={newNote.etag}
                onChange={onChange}
                type='text'
                className='form-control border-2'
                id='etag'
                name='etag'
                aria-describedby='etag'
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Update Note
            </button>
          </form>
          {/****************************************************  Form *************************************************************/}
        </Box>
      </Modal>
      {/* End of the Modal */}
      <div className='row my-3'>
        <h3>My Notes</h3>
        {/* {note === undefined && 'No notes to display'} */}
        {note &&
          note.map(
            noteItem =>
              //** format of noteItem:
              //  {
              //     "_id": "65b8f5789f041cd269a6232c",
              //     "user": "65a8e86153555018dd6d74ef",
              //     "title": "title",
              //     "description": "desc",
              //     "tag": "tag of tag",
              //     "date": "2024-01-30T13:11:20.964Z",
              //     "__v": 0
              //   }
              noteItem && (
                <NoteItem
                  showAlert={showAlert}
                  updateNote={() => updateNote(noteItem)}
                  noteItem={noteItem}
                  key={noteItem._id}
                />
              )
          )}
      </div>
    </>
  )
}
