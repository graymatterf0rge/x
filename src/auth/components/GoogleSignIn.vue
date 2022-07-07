<template>
  <q-btn @click="signInWithGoogle" label="Sign in with Google" />
</template>
<script setup>
  import _ from "lodash"
  import { useStore } from 'vuex'
  import { auth } from "boot/firebase"  
  import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
  import { FirebaseAuthentication } from "@robingenz/capacitor-firebase-authentication"
  
  const store = useStore()

  const getCurrentUser = async () => {
    const result = await FirebaseAuthentication.getCurrentUser()
    return result.user
  }
  
  const loggedInUser = getCurrentUser().then((user)=>{
    return (_.isNull(user))
  })

  const signInWithGoogle = async () => {
    
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    console.log("result",result)
    const user = result.user
       
    user.getIdTokenResult(true).then(idTokenResult => {
      _.set(user, 'admin', idTokenResult.claims.admin)
    })
    store.dispatch("auth/userSignOn",user)

  }
  const logOut = () => signOut(auth)
</script>

