<template>
  <h2>会員登録</h2>
  <form @submit.prevent="submit">
    <div>
      <label for="displayName">ニックネーム</label><br />
      <input id="displayName" v-model="displayName" type="text" />
    </div>
    <div>
      <label for="email">メールアドレス</label><br />
      <input id="email" v-model="email" type="text" />
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
      <label for="password">氏名</label><br />
      <input id="name" type="text" />
    </div>
    <div>
      <label for="password">住所</label><br />
      <input id="address" type="text" />
    </div>
    <div>
      <label for="phoneNumber">電話番号</label><br />
      <input id="phoneNumber" type="text" />
    </div>
    <div>
      <button type="submit">ログイン</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { signUp, SignUpInput } from '/@/compositions/auth'

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
