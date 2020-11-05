import { ref, readonly } from 'vue'
import type { ImageInput } from '/@/composables/items'

type ReadImageResult = ImageInput

type ReadImageProgress = {
  pending: boolean
}

export const useFileInputOnChange = () => {
  const image = ref<ReadImageResult | undefined>(undefined)
  const progress = ref<ReadImageProgress | undefined>(undefined)
  const onChange = async (event) => {
    progress.value = { pending: true }
    if (event.target.files.length === 0) {
      progress.value = { pending: false }
      return
    }
    const file = event.target.files[0]
    const original = await readFileAsDataURL(file)
    const dataURL = await resizeImage(original, file.type)
    image.value = {
      type: file.type,
      dataURL: dataURL,
    }
    progress.value = { pending: false }
  }
  return {
    onChange,
    image: readonly(image),
    progress: readonly(progress),
  }
}

const readFileAsDataURL = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result as string)
    }
    reader.readAsDataURL(file)
  })
}

const resizeImage = (dataURL: string, type: string, width: number = 500) => {
  const image = new Image()
  const promise = new Promise<string>((resolve) => {
    image.onload = () => {
      const height = (image.height / image.width) * width
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', String(width))
      canvas.setAttribute('height', String(height))
      const context = canvas.getContext('2d')
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        width,
        height
      )
      resolve(canvas.toDataURL(type))
    }
  })
  image.src = dataURL
  return promise
}
