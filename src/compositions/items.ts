import { ref, readonly, onBeforeUnmount, reactive } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export type Item = {
  id?: string
  name: string
  description: string
  price: number
  image: {
    url: string
  }
  createdAt: Date
}

export type ItemInput = {
  name: string
  description: string
  price: number
  image: {
    extension: string
    dataURL: string
  }
}

const converter: firebase.firestore.FirestoreDataConverter<Item> = {
  toFirestore: (item: Item): firebase.firestore.DocumentData => ({
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
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
    image: snapshot.get('image'),
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
    const reference = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('items')
      .withConverter(converter)
      .doc()
    //画像のアップロード
    const image = firebase
      .storage()
      .ref(`${firebase.auth().currentUser.uid}/images`)
      .child(`${reference.id}.${item.image.extension}`)
    const url = await image
      .putString(item.image.dataURL, 'data_url')
      .then(async (): Promise<string> => await image.getDownloadURL())
    await reference.set({
      ...item,
      image: { url },
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(error)
  }
}
