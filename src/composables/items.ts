import { ref, readonly, onBeforeUnmount } from 'vue'
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
}

export type ImageInput = {
  type: ImageType
  dataURL: string
}

type ImageType =
  | 'image/apng'
  | 'image/bmp'
  | 'image/gif'
  | 'image/x-icon'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp'

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

export const createItem = async (item: ItemInput, image: ImageInput) => {
  try {
    const reference = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('items')
      .withConverter(converter)
      .doc()
    //画像のアップロード
    const uploadingImage = firebase
      .storage()
      .ref(`${firebase.auth().currentUser.uid}/images`)
      .child(`${reference.id}${mimeTypeToExtension(image.type)}`)
    const url = await uploadingImage
      .putString(image.dataURL, 'data_url')
      .then(async (): Promise<string> => await uploadingImage.getDownloadURL())
    await reference.set({
      ...item,
      image: { url },
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(error)
  }
}

const mimeTypeToExtension = (mimeType: ImageType) => {
  switch (mimeType) {
    case 'image/apng':
      return '.apng'
    case 'image/bmp':
      return '.bmp'
    case 'image/gif':
      return '.gif'
    case 'image/jpeg':
      return '.jpg'
    case 'image/png':
      return '.png'
    case 'image/svg+xml':
      return '.svg'
    case 'image/tiff':
      return '.tiff'
    case 'image/webp':
      return '.webp'
    case 'image/x-icon':
      return '.ico'
    default:
      throw new Error(`unexpected mime type: ${mimeType}`)
  }
}
