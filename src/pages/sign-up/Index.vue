<template>
  <h2>会員登録</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="displayName">ニックネーム</label><br />
      <input id="displayName" v-model="displayName" type="text" />
    </div>
    <div>
      <label for="email">メールアドレス</label><br />
      <input id="email" v-model="email" type="text" autocomplete="username" />
    </div>
    <div>
      <label for="password">パスワード</label><br />
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="new-password"
      />
    </div>
    <div>
      <label for="name">氏名</label><br />
      <input id="name" v-model="name" type="text" />
    </div>
    <div>
      <label for="zipCode">郵便番号</label><br />
      <input id="zipCode" v-model="zipCode" type="text" />
    </div>
    <div>
      <label for="address">住所</label><br />
      <input id="address" v-model="address" type="text" />
    </div>
    <div>
      <label for="phoneNumber">電話番号</label><br />
      <input id="phoneNumber" v-model="phoneNumber" type="text" />
    </div>
    <div>
      <button type="submit">会員登録してログイン</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { signUp, SignUpInput } from '/@/composables/auth'

export default defineComponent({
  setup() {
    const input = reactive<SignUpInput>({
      displayName: '',
      email: '',
      password: '',
      name: '',
      zipCode: '',
      address: '',
      phoneNumber: '',
    })
    const router = useRouter()
    const submit = async () => {
      try {
        await signUp(input)
        await router.push({ name: 'members' })
      } catch (error) {
        console.log('error at sign in', error)
      }
    }
    return {
      ...toRefs(input),
      submit,
    }
  },
})
</script>
