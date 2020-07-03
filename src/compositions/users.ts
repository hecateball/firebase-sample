import { ref } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export type SignUpInput = {
  displayName: string
  email: string
  password: string
}

export type SignInInput = {
  email: string
  password: string
}

export const useCurrentUser = async () => {
  const currentUser = ref<firebase.User | null>(null)
  await new Promise<void>((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      currentUser.value = user
      resolve()
    })
  })
  return {
    currentUser,
  }
}

export const signUp = async (input: SignUpInput) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password)
    await firebase.auth().currentUser.updateProfile({
      displayName: input.displayName,
    })
  } catch (error) {
    console.error(error)
  }
}

export const signIn = async (input: SignInInput) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (error) {
    console.error(error)
  }
}
