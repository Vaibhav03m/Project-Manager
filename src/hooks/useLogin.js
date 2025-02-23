import { useState } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      const documentRef = projectFirestore.collection('users').doc(res.user.uid)
      await documentRef.update({ online: true })

      dispatch({ type: 'LOGIN', payload: res.user })

      setIsPending(false)
      setError(null)
    } 
    catch(err) {
      console.log(err.message)
      if (err.message.includes('INVALID_LOGIN_CREDENTIALS')) {
        setError('Invalid credentials. Please check your email and password.');
      } 
      else {
        setError('An error occurred. Please try again.');
      }
      setIsPending(false)
    }
  }

  return { login, isPending, error }
}