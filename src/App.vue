<template>
  <header>
    <h1>Vue3.0 + Firebase さんぷるあぷり</h1>
    <nav>
      <RouterLink :to="{ name: 'index' }">Index</RouterLink> /
      <RouterLink :to="{ name: 'sign-up' }">会員登録</RouterLink> /
      <RouterLink :to="{ name: 'sign-in' }">ログイン</RouterLink> /
      <RouterLink :to="{ name: 'members' }">会員ページ</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideCurrentUser } from '/@/plugins/firebase'

export default defineComponent({
  setup() {
    provideCurrentUser()
  },
})
</script>
