<template>
  <h2>
    ようこそ、
    <mark>{{ currentUser.displayName }}</mark>
    さん！
  </h2>
  <section>
    <RouterLink :to="{ name: 'members-create' }">商品登録</RouterLink>
  </section>
  <form @submit.prevent="submit">
    <button type="submit">ログアウト</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, useCurrentUser } from '/@/compositions/users'

export default defineComponent({
  setup() {
    const currentUser = useCurrentUser()
    const router = useRouter()
    const submit = async () => {
      await signOut()
      await router.push({ name: 'index' })
    }
    return {
      currentUser,
      submit,
    }
  },
})
</script>
