import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {

  const history = useHistory()

  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  // ! Handle errors
  const [errors, setErrors] = useState(false)

  // ! Handle login input
  const [dataFromLogin, setDataFromLogin] = useState({
    email: '',
    password: '',
  })

  // ! Handle login data
  const handleLoginData = (event) => {
    const newLoginData = { ...dataFromLogin, [event.target.name]: event.target.value }
    setDataFromLogin(newLoginData)
  }

  // ! Submit login button
  const submitLogin = async event => {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/login/', dataFromLogin)
      setToken(data.token)
      history.push('/home')
    } catch (err) {
      console.log(err)
      setErrors(true)
      window.alert('Your email or password is wrong!')
    }
  }

  // ! Handle register input
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  // ! Handle register data
  const handleRegisterData = (event) => {
    const getUserData = { ...registerData, [event.target.name]: event.target.value }
    const newError = { ...errors, [event.target.name]: '' }
    setRegisterData(getUserData)
    setErrors(newError)
  }

  // ! Submit register button

  const submitRegisterForm = async event => {
    event.preventDefault()

    try {
      await axios.post('/api/auth/register/', registerData)
      history.push('/home')
    } catch (err) {
      console.log(err)
      window.alert('Your email or username is already in use.')
      setErrors(err.response.data.errors)
    }
  }

  // ! Creating toggle on click to change the view.
  const toggleForm = () => {
    document.querySelector('.container').classList.toggle('active')
  }

  return (

    <>
      <section>
        <div className='container'>

          {/* Login View */}
          <div className='user signinBox'>
            <div className='imageBox'>
              <img src='https://picsum.photos/id/237/400/500' alt='loginPicture'/>
            </div>
            <div className='formBox'>
              <form onSubmit={submitLogin}>

                <h2>Sing in</h2>

                <input 
                  name='email'
                  type='email' 
                  placeholder='Email' 
                  value={dataFromLogin.email}
                  required
                  onChange={handleLoginData} 
                />

                {errors.email && <p>{errors.email.message}</p>}

                <input 
                  name='password'
                  type='password' 
                  placeholder='Password' 
                  value={dataFromLogin.password}
                  required
                  onChange={handleLoginData} 
                />

                {errors.password && <p>{}errors.password.message</p>}

                <input type='submit' value='Login' onChange={submitLogin} />

                <p className='signup'>Don&apos;t have an account? <a href='#' onClick={toggleForm}>Sign Up</a></p>
              </form>
            </div>
          </div>

          {/* Register view */}
          <div className='user signupBox'>
            <div className='formBox'>
              <form onSubmit={submitRegisterForm}>
                <h2>Create an account</h2>

                <input 
                  type='text' 
                  name='username'
                  placeholder='Username' 
                  value={registerData.username}
                  onChange={handleRegisterData}
                  required
                />

                <input 
                  type='email' 
                  name='email'
                  placeholder='Email' 
                  value={registerData.email}
                  onChange={handleRegisterData}
                  required
                />

                <input 
                  type='password' 
                  name='password'
                  placeholder='Create Password' 
                  value={registerData.password}
                  onChange={handleRegisterData}
                  required
                />

                <input 
                  type='password'
                  name='password_confirmation'
                  placeholder='Confirm Password' 
                  value={registerData.password_confirmation}
                  onChange={handleRegisterData}
                  required
                />

                <input type='submit' value='Sign Up' />
                <p className='signup'>Don&apos;t have an account? <a href='#' onClick={toggleForm}>Sign In</a></p>
              </form>
            </div>
            <div className='imageBox'>
              <img src='https://picsum.photos/id/190/400/500' alt='loginPicture'/>
            </div>
          </div>

        </div>
      </section>

    </>

  )
}

export default Login