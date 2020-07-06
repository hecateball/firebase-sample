import { ref, readonly, onBeforeUnmount } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export type Item = {
  id?: string
  name: string
  description: string
  price: number
  createdAt: Date
}

export type ItemInput = Omit<Item, 'createdAt'>

const converter: firebase.firestore.FirestoreDataConverter<Item> = {
  toFirestore: (item: Item): firebase.firestore.DocumentData => ({
    name: item.name,
    description: item.description,
    price: item.price,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  }),
  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Item => ({
    id: snapshot.id,
    name: snapshot.get('name'),
    description: snapshot.get('description'),
    price: snapshot.get('price'),
    createdAt: snapshot.get('createdAt', options).toDate(),
  }),
}

export const useItems = (uid?: string) => {
  const items = ref<Item[]>([])
  if (uid) {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('items')
      .withConverter(converter)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        items.value = snapshot.docs.map((document) =>
          document.data({ serverTimestamps: 'estimate' })
        )
      })
    onBeforeUnmount(unsubscribe)
  } else {
    const unsubscribe = firebase
      .firestore()
      .collectionGroup('items')
      .withConverter(converter)
      .onSnapshot((snapshot) => {
        items.value = snapshot.docs.map((document) =>
          document.data({ serverTimestamps: 'estimate' })
        )
      })
    onBeforeUnmount(unsubscribe)
  }
  return readonly(items)
}

export const createItem = async (item: ItemInput) => {
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('items')
      .withConverter(converter)
      .add({
        ...item,
        createdAt: new Date(),
      })
  } catch (error) {
    console.error(error)
  }
}
