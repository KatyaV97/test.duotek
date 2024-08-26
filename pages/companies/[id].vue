<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="-1"
      :is-dark-theme="true"
  />

  <Alert
      :isError="errorAlert.isShown"
      :value="errorAlert.text"
      @close-alert="toggleErrorAlert($event,'','')"
  />

  <WrapperContainer>
    <FullContentBlock>
      <div
          v-if="!isLoading"
          class="company-container"
      >
        <NuxtLink
            to="/companies"
            class="breadcrumb-container"
        >
          <svg
              class="back-arrow"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H5.41421L9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289Z"
                fill="#030953"/>
          </svg>
          <p class="_non-space">
            Компании
          </p>
        </NuxtLink>
        <h1 class="_non-space">
          {{ company.data.title }}
        </h1>
        <div class="center-container">
          <div class="main-content-block">
            <div class="numbers-block">
              <div class="content">
                <p class="number _non-space">
                  {{ company.data.age }}
                </p>
                <p class="text _non-space">
                  {{ getHelperWord('год', 'года', 'лет', company.data.age) }}
                </p>
              </div>
              <div class="content">
                <p class="number _non-space">
                  {{ company.data.staff }}
                </p>
                <p class="text _non-space">
                  {{ getHelperWord('человек', 'человека', 'человек', company.data.staff) }}
                </p>
              </div>
            </div>
            <div class="bottom-content">
              <div class="part-content">
                <p class="short-info _non-space">
                  {{ company.data.description_short }}
                </p>
                <p class="full-info _non-space">
                  {{ company.data.description_full }}
                </p>
              </div>
              <div
                  v-if="company.data?.companySpecializations
                    && company.data.companySpecializations.length > 0"
                  class="part-content"
              >
                <p class="short-info _non-space">
                  Проектная специализация
                </p>
                <Tags
                    :tags="company.data.companySpecializations"
                />
              </div>
              <div
                  v-if="company.data?.industries
                    && company.data.industries.length > 0"
                  class="part-content"
              >
                <p class="short-info _non-space">
                  Технологии
                </p>
                <Tags
                    :tags="company.data.industries"
                />
              </div>
            </div>
          </div>
          <BusinessCard
              v-if="!isLoading"
              :company="company"
          />
        </div>
      </div>
    </FullContentBlock>
  </WrapperContainer>

  <Footer/>
</template>

<script lang="ts">
import Error from "~/mixins/error"

export default {
  mixins: [Error],
  data() {
    return {
      pageTitle: 'Doutek. Главная' as string,
      isLoading: true as boolean
    }
  },
  async setup() {
    const route = useRoute()
    const {pending: companyPending, data: company} = await useFetch('/api/companies/getCompanyById', {
          query: {
            companyId: route.params.id
          },
          lazy: true,
          server: false
        }
    )
    return {
      companyPending,
      company
    }
  },
  methods: {
    getHelperWord(one: string, two: string, five: string, count: number): string {
      let n = Math.abs(count)
      n %= 100
      if (n >= 5 && n <= 20) {
        return five
      }
      n %= 10
      if (n === 1) {
        return one
      }
      if (n >= 2 && n <= 4) {
        return two
      }
      return five
    },
  },
  watch: {
    companyPending: {
      handler(newVal: Ref<boolean>): void {
        if (newVal || this.errorHandler(this.company)) return
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
</style>