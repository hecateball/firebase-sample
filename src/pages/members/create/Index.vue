<template>
  <h2>なんか商品を登録するフォーム</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="name">商品名</label><br />
      <input id="name" v-model="name" type="text" />
    </div>
    <div>
      <label for="description">説明</label><br />
      <input id="description" v-model="description" type="text" />
    </div>
    <div>
      <label for="price">価格</label><br />
      <input id="price" v-model.number="price" type="number" />
    </div>
    <button type="submit">登録</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Item, createItem } from '/@/compositions/items'

export default defineComponent({
  setup() {
    const input = reactive<Item>({
      name: '',
      description: '',
      price: 100,
    })
    const submit = async () => {
      console.log(input)
      await createItem(input)
    }
    return {
      ...toRefs(input),
      submit,
    }
  },
})
</script>
