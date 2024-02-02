import { React, useState } from 'react'
// ** useHistory is depricated
// import { useHistory } from 'react-router'
import { useNavigate } from 'react-router-dom'

export default function Login (props) {
  const url = 'http://127.0.0.1:3001'
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // to be don'
    const response = await fetch(`${url}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    if (response.ok) {
      const json = await response.json()
      if (json.status) {
        props.showAlert({ type: 'success', message: 'Logged in successfully' })
        localStorage.setItem('token', json.authToken)
        navigate('/')
      } else {
        props.showAlert({
          type: 'danger',
          message: 'Unable to login, please enter valid credentials'
        })
      }
      console.log('this is json: ', json)
    } else {
      // Handle error cases here
      props.showAlert({
        type: 'danger',
        message: `${response.statusText}`
      })
    }
  }
  return (
    <div className='container '>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            name='email'
            value={credentials.email}
            onChange={onChange}
            type='email'
            required
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            name='password'
            value={credentials.password}
            onChange={onChange}
            required
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}
