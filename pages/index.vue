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

<script lang="ts">
export default {
  data() {
    return {
      pageTitle: 'Doutek. Главная' as string,
    }
  }
}
</script>

<style scoped>
</style>