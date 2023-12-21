import { databae } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth"


import { useState, useEffect } from "react";

export const useAuthentication = () => {

  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [cancelled, setCancelled] = useState(false)

  function checkIfIsCancelled(){

    if(cancelled){
      return
    }
  }

  
  const auth = getAuth()

  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)

    try{

      const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)

      await updateProfile(user, {displayName: data.displayName})

      setLoading(false)

      return user

    }catch(error){
      
      let systemMessageError

      if(error.message.includes("Password")){
        systemMessageError  = "A senha precisa conter pelo menos 6 caracteres!"
      }else if(error.message.includes("EMAIL_EXISTS")){
        systemMessageError = "E-mail já cadastrado!"
      }else {
        systemMessageError = "Ocorrou um erro, por favor tente mais tarde"
      }

      setError(systemMessageError)

    }
    
    setLoading(false)
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])


  const logout = () => {

    checkIfIsCancelled()
    signOut(auth)

  }

  return {auth, createUser, error, loading, logout}

} 

