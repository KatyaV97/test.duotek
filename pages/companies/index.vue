<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="1"
  />

  <Alert
      :isError="errorAlert.isShown"
      :value="errorAlert.text"
      @close-alert="toggleErrorAlert($event,'','')"
  />

  <WrapperContainer>
    <RightContentBlock>
      <div class="header-top-block">
        <h1 class="title _non-space">
          {{ pageCommonInfo.title }}
        </h1>
        <div class="search-block">
          <MainInput
              :value="search.value"
              :placeholder="search.placeholder"
              @input="onInput"
          />
          <MainButton
              :classes="['dark-blue', 'high']"
              @click="initSearchValue"
          >
            Найти
          </MainButton>
        </div>
      </div>
      <div
          v-if="!isLoading
                  && companiesData.data
                  && companiesData.data?.data
                  && companiesData.data.data.length > 0"
          class="companies-block"
      >
        <CompanyCard
            v-for="company in companiesData.data.data"
            :key="company.id"
            :company="company"
        />
      </div>
      <div
          v-else-if="!isLoading"
          class="empty-block"
      >
        <p class="_non-space">
          К сожалению, ничего не найдено
        </p>
      </div>
    </RightContentBlock>
    <LeftContentBlock>
      <h1 class="tablet-title _non-space">
        {{ pageCommonInfo.title }}
      </h1>
      <FiltersBlock
          v-if="!isLoading"
          :initial-company-specialization-value="specialization"
          :initial-industry-value="industry"
          @init-filter="initFilterParameter"
          @clear-filter="clearFilter"
      />
    </LeftContentBlock>
  </WrapperContainer>
  <div class="paginate-container">
    <Paginate
        v-if="companiesData.data?.meta
              && companiesData.data.meta.last_page > 1"
        v-model="companiesData.data.meta.current_page"
        :page-count="companiesData.data.meta.last_page"
        :click-handler="clickPaginate"
    />
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import {ref, Ref, onMounted} from "vue"
import Error from "@/mixins/error"
import qs from "qs"
import Paginate from "vuejs-paginate-next"
import type {DataFetcher, FilterParameter} from "@/types/company"
import {useUrlParams} from "@/composables/useQueryParams"

const {getQueryParams} = useUrlParams()
const pageTitle = 'Doutek. Каталог компаний'
const pageCommonInfo: {title: string} = {
  title: 'Каталог компаний'
}
const search: {
  value: string,
  placeholder: string
} = {
  value: '',
  placeholder: 'Поиск продукта или отрасли'
}
const companiesData: DataFetcher = {
  data: null,
  pending: true
}
let specialization = ref('')
let industry = ref('')
let page = ref('')

onMounted(async ()=>{
  const params = getQueryParams()
  await this.initCompaniesDataFetch(params)
})
let isLoading = ref(true)
export default {
  mixins: [Error],
  components: {
    Paginate
  },
  methods: {
    initSearchValue(): void {
      if (this.search.value) {
        this.initFilterParameter({search: this.search.value})
        return
      }
      this.clearFilter('search')
    },
    onInput(value: string): void {
      this.search.value = value
      if (!value) {
        this.clearFilter('search')
      }
    },
    async clickPaginate(number: number): Promise<void> {
      await this.initFilterParameter({page: number.toString()})
      this.companiesData.data.meta.current_page = number
    },
    async clearFilter(nameParameter: string): Promise<void> {
      if (this.$route.query?.[nameParameter]) {
        const params = qs.parse(this.$route.query)
        delete params[nameParameter]
        this.$router.replace({query: params})
        await this.initCompaniesDataFetch(params)
      }
    },
    async initFilterParameter(params: FilterParameter): Promise<void> {
      await this.clearFilter('page')
      if (this.$route.query) {
        params = {
          ...qs.parse(this.$route.query),
          ...params
        }
      }
      this.$router.push({query: params})
      await this.initCompaniesDataFetch(params)
    },
    async initCompaniesDataFetch(params: Object): Promise<void> {
      const {pending: companiesPending, data: companies} = await useFetch('/api/companies/getCompanies',
          {
            query: params,
          })
      this.companiesData.data = companies
      this.companiesData.pending = companiesPending
    },
  watch: {
    'companiesData.pending': {
      handler(newVal: Ref<boolean>): void {
        if (newVal || this.errorHandler(this.companiesData.data)) return
        this.isLoading = false
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>