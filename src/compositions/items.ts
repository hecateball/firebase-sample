import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export type Item = {
  name: string
  description: string
  price: number
}

export const createItem = async (item: Item) => {
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('items')
      .add({
        ...item,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
  } catch (error) {
    console.error(error)
  }
}
