import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export type SignUpInput = {
  displayName: string
  email: string
  password: string
  name: string
  zipCode: string
  address: string
  phoneNumber: string
}

export type SignInInput = {
  email: string
  password: string
}

export const signUp = async (input: SignUpInput) => {
  // Firebase Authへの書き込み
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password)
    await firebase.auth().currentUser.updateProfile({
      displayName: input.displayName,
    })
    await firebase.auth().currentUser.getIdToken(true)
  } catch (error) {
    console.error(error)
  }
  // Firestoreへの書き込み
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set({
        displayName: input.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
  } catch (error) {
    console.error(error)
    await firebase.auth().currentUser.delete()
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
