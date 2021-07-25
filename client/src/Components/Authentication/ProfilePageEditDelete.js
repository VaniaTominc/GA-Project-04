/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from ' react'
import { useParams, useHistory } from 'react-router-dom'

import axios from 'axios'
import { getCurrentUser, getTokenFromStorage } from './auth'


const EditDeleteProfile = () => {

  const history = useHistory()
  
  const [userToEdit, setUserToEdit] = useState({
    first_name: '',
    last_name: '',
    email_name: '',
    password: '',
    password_confirmation: '',
  })

}