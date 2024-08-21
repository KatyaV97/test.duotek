<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="1"
  />

  <WrapperContainer>
    <RightContentBlock>
      <div class="header-top-block">
        <h1 class="_non-space">
          {{ pageCommonInfo.title }}
        </h1>

      </div>
    </RightContentBlock>
  </WrapperContainer>

  <Footer/>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pageTitle: 'Doutek. Каталог компаний',
      pageCommonInfo: {
        title: 'Каталог компаний'
      }
    }
  }
}
</script>

<style scoped>
</style>