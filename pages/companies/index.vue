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
      :show="alert.show"
      :value="alert.text"
      @focus="alert.focus = true"
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
          v-if="!loading
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
          v-else-if="!loading"
          class="empty-block"
      >
        <p class="_non-space">
          К сожалению, ничего не найдено
        </p>
      </div>
    </RightContentBlock>
    <LeftContentBlock>
      <FiltersBlock
          v-if="!loading"
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

<script lang="ts">
import Error from "~/mixins/error"
import qs from "qs"
import Paginate from "vuejs-paginate-next"
import type {DataFetcher, FilterParameter} from "~/types/company"

export default {
  mixins: [Error],
  components: {
    Paginate
  },
  data() {
    return {
      pageTitle: 'Doutek. Каталог компаний' as string,
      pageCommonInfo: {
        title: 'Каталог компаний'
      } as {
        title: string
      },
      search: {
        value: '',
        placeholder: 'Поиск продукта или отрасли'
      } as {
        value: string,
        placeholder: string
      },
      companiesData: {
        data: null,
        pending: true
      } as DataFetcher,
      specialization: '' as string,
      industry: '' as string,
      page: '' as string,
      perPage: '' as string,
      loading: true as boolean
    }
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
    async initParams(): Promise<void> {
      let params = {}
      if (this.$route.query?.specialization) {
        params = {
          specialization: this.$route.query?.specialization
        }
        this.specialization = this.$route.query?.specialization
        console.log(this.specialization)
      }
      if (this.$route.query?.industry) {
        params = {
          ...params,
          industry: this.$route.query?.industry
        }
        this.industry = this.$route.query?.industry
      }
      if (this.$route.query?.search) {
        params = {
          ...params,
          search: this.$route.query?.search
        }
        this.search.value = this.$route.query?.search
      }
      if (this.$route.query?.page) {
        params = {
          ...params,
          page: this.$route.query?.page
        }
      }
      await this.initCompaniesDataFetch(params)
    }
  },
  async mounted() {
    if (!this.$route.query) {
      await this.initCompaniesDataFetch({})
      return
    }
    await this.initParams()
  },
  watch: {
    'companiesData.pending': {
      handler(newVal: Ref<boolean>): void {
        if (newVal || this.errorHandler(this.companiesData.data)) return
        this.loading = false
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>