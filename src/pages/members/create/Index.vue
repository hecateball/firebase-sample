<template>
  <h2>商品を登録するフォーム</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="name">商品名</label><br />
      <input id="name" v-model="name" type="text" />
    </div>
    <div>
      <label for="image">画像</label><br />
      <input id="image" type="file" accept="image/*" @change="onChange" />
    </div>
    <div v-if="image !== undefined">
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
import { ItemInput, createItem } from '/@/composables/items'
import { useFileInputOnChange } from '/@/composables/utilities/images'

export default defineComponent({
  setup() {
    const input = reactive<ItemInput>({
      name: '',
      description: '',
      price: 100,
    })
    const { onChange, image } = useFileInputOnChange()
    const router = useRouter()
    const submit = async () => {
      await createItem(input, image.value)
      await router.push({ name: 'members' })
    }
    return {
      ...toRefs(input),
      image,
      onChange,
      submit,
    }
  },
})
</script>
