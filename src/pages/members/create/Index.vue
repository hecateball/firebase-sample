<template>
  <h2>商品を登録するフォーム</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="name">商品名</label><br />
      <input id="name" v-model="name" type="text" />
    </div>
    <div>
      <label for="image">画像</label><br />
      <input id="image" type="file" @change="onChange" />
    </div>
    <div v-if="image.dataURL !== ''">
      <img :src="image.dataURL" />
    </div>
    <div>
      <label for="description">商品説明</label><br />
      <input id="description" v-model="description" type="text" />
    </div>
    <div>
      <label for="price">価格</label><br />
      <input id="price" v-model.number="price" type="text" />
    </div>
    <button type="submit">登録</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ItemInput, createItem } from '/@/compositions/items'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

export default defineComponent({
  setup() {
    const input = reactive<ItemInput>({
      name: '',
      description: '',
      price: 100,
      image: {
        extension: '',
        dataURL: '',
      },
    })
    const onChange = (event) => {
      if (event.target.files.length === 0) {
        return
      }
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (progressEvent) => {
        const index = file.name.lastIndexOf('.')
        input.image.extension = index < 1 ? '' : file.name.slice(index + 1)
        input.image.dataURL = progressEvent.target.result as string
      }
      reader.readAsDataURL(event.target.files[0])
    }
    const router = useRouter()
    const submit = async () => {
      await createItem(input)
      await router.push({ name: 'members' })
    }
    return {
      ...toRefs(input),
      onChange,
      submit,
    }
  },
})
</script>
