// import { circularProgressClasses } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup (props) { // props contains showAlert() method of alert component
  // const { showAlert } = props
  const url = 'http://127.0.0.1:3001'
  const [Credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    ConfirmPassword: ''
  })
  const navigate = useNavigate()
  const onChange = e => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    // const { name, email, password } = Credentials
    // console.log(Credentials.name, Credentials.email, Credentials.password)
    const response = await fetch(`${url}/api/auth/sign-up`, {
      method: 'POST',
      //** */ forgot to add header for content-type which caused bad req error
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Credentials.name,
        email: Credentials.email,
        password: Credentials.password
      })
    })

    if (response.ok) {
      const json = await response.json()
      // console.log('this is json', json)
      if (json.status) {
        // redirect
        props.showAlert({ type: 'success', message: 'Sign-up successfully' })
        localStorage.setItem('token', json.authToken)
        navigate('/')
      } else {
        props.showAlert({
          type: 'danger',
          message: 'Unable to Sign-up,please enter valid credentials'
        })
      }
    } else {
      props.showAlert({
        type: 'danger',
        message: `${response.statusText}`
      })

      console.error(`Error: ${response.status} - ${response.statusText}`)
    }
    // eslint-disable-next-line
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group my-3'>
          <label htmlFor='exampleInputEmail1'>Name</label>
          <input
            type='text'
            required
            minLength={3}
            name='name'
            value={Credentials.name}
            onChange={onChange}
            className='form-control'
            id='name'
            aria-describedby='name'
            placeholder='Enter Name'
          />
        </div>

        <div className='form-group my-3'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            required
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}'
            name='email'
            value={Credentials.email}
            onChange={onChange}
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group my-3'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            required
            minLength={5}
            name='password'
            value={Credentials.password}
            onChange={onChange}
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
          />
        </div>
        <div className='form-group my-3'>
          <label htmlFor='exampleInputPassword1'>Confirm Password</label>
          <input
            required
            minLength={5}
            name='ConfirmPassword'
            value={Credentials.ConfirmPassword}
            onChange={onChange}
            type='password'
            className='form-control'
            id='exampleInputPassword2'
            placeholder='Confirm Password'
          />
        </div>
        <button type='submit' className='btn btn-primary my-2'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
