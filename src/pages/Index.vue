<template>
  <img alt="Vue logo" src="/@/assets/logo.png" />
  <section>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>商品説明</th>
          <th>価格</th>
          <th>作成日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useItems } from '/@/compositions/items'

export default defineComponent({
  setup() {
    const items = useItems()
    return {
      items,
    }
  },
})
</script>
