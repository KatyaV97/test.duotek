<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="-1"
  />

  <Footer/>
</template>

<script setup lang="ts">
const pageTitle = 'Doutek. Главная'
</script>

<style scoped>
</style>