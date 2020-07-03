<template>
  <h2>ログイン</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="email">Email</label><br />
      <input id="email" v-model="email" type="text" />
    </div>
    <div>
      <label for="password">Password</label><br />
      <input id="password" v-model="password" type="password" />
    </div>
    <div>
      <button type="submit">ログイン</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { signIn, SignInInput } from '/@/compositions/users'

export default defineComponent({
  setup() {
    const input = reactive<SignInInput>({
      email: '',
      password: '',
    })
    const router = useRouter()
    const submit = async () => {
      await signIn(input)
      await router.push({ name: 'members' })
    }
    return {
      ...toRefs(input),
      submit,
    }
  },
})
</script>
