<template>
  <header>
    <h1>Header</h1>
    <nav>
      <RouterLink :to="{ name: 'index' }">Index</RouterLink> /
      <RouterLink :to="{ name: 'sign-up' }">会員登録</RouterLink> /
      <RouterLink :to="{ name: 'sign-in' }">ログイン</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
