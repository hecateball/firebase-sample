<template>
  <h2>会員登録</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="name">Display Name</label><br />
      <input id="name" v-model="displayName" type="text" />
    </div>
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
import { signUp, SignUpInput } from '/@/compositions/users'

export default defineComponent({
  setup() {
    const input = reactive<SignUpInput>({
      displayName: '',
      email: '',
      password: '',
    })
    const router = useRouter()
    const submit = async () => {
      await signUp(input)
      await router.push({ name: 'members' })
    }
    return {
      ...toRefs(input),
      submit,
    }
  },
})
</script>
