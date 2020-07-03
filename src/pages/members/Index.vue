<template>
  <Suspense>
    <template #default>
      <DisplayName />
    </template>
  </Suspense>
  <form @submit.prevent="submit">
    <button type="submit">ログアウト</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from '/@/compositions/users'
import DisplayName from '/@/components/DisplayName.vue'

export default defineComponent({
  components: {
    DisplayName,
  },
  setup() {
    const router = useRouter()
    const submit = async () => {
      await signOut()
      await router.push({ name: 'index' })
    }
    return {
      submit,
    }
  },
})
</script>
