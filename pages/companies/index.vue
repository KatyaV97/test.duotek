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
        <div class="search-block">
          <MainInput
              :value="search.value"
              :placeholder="search.placeholder"
          />
          <MainButton
              :classes="['dark-blue', 'high']"
          >
            Найти
          </MainButton>
        </div>
        <div class="companies-block">

        </div>
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
      },
      search: {
        value: '',
        placeholder: 'Поиск продукта или отрасли'
      }
    }
  },
  async setup() {
    const {data: definitions} = await useFetch('/api/companies/getDefinitions',
        {
          lazy: true,
          server: false
        })
    return {
      definitions
    }
  },
  watch: {
  }
}
</script>

<style scoped>
</style>