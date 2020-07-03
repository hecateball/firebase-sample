<template>
  <h2>
    ようこそ、
    <mark>{{ currentUser.displayName }}</mark>
    さん！
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCurrentUser } from '/@/compositions/users'

export default defineComponent({
  async setup() {
    const { currentUser } = await useCurrentUser()
    return {
      currentUser,
    }
  },
})
</script>
