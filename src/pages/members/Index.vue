<template>
  <h2>
    ようこそ、
    <mark>{{ currentUser.displayName }}</mark>
    さん！
  </h2>
  <section>
    <RouterLink :to="{ name: 'members-create' }">商品登録</RouterLink>
  </section>
  <section>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>画像</th>
          <th>商品名</th>
          <th>商品説明</th>
          <th>価格</th>
          <th>作成日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td><img :src="item.image.url" /></td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <form @submit.prevent="submit">
    <button type="submit">ログアウト</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, useCurrentUser } from '/@/compositions/users'
import { useItems } from '/@/compositions/items'

export default defineComponent({
  setup() {
    const currentUser = useCurrentUser()
    const items = useItems(currentUser.value.uid)
    const router = useRouter()
    const submit = async () => {
      await signOut()
      await router.push({ name: 'index' })
    }
    return {
      currentUser,
      items,
      submit,
    }
  },
})
</script>
