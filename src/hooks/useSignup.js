import { useState } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      await projectFirestore.collection('users').doc(res.user.uid).set({ 
        online: true,
        displayName,
        photoURL: imgUrl,
      })

      dispatch({ type: 'LOGIN', payload: res.user })

      setIsPending(false)
      setError(null)
      
    } 
    catch(err) {
      setError(err.message)
      setIsPending(false)    
    }
  }

  return { signup, error, isPending }
}