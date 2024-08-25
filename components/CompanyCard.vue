<template>
  <div
      @click="moveTo"
      class="company-card-container"
  >
    <div class="img-block">
      <img
          :src="company.picture"
          alt="Иконка компании"
      />
    </div>
    <div class="content-info">
      <h3 class="title _non-space">
        {{ company.title }}
      </h3>
      <p class="description _non-space">
        {{ company.description_full }}
      </p>
      <Tags
          v-if="company?.industries
                && company.industries.length > 0"
          :tags="company.industries"
      />
    </div>
    <img
        src="/public/arrow-red.svg"
        alt="Стрелка"
        class="arrow"
    />
  </div>
</template>

<script lang="ts">
import type {Company} from "~/types/company"

export default {
  name: 'CompanyCard',
  props: {
    company: {
      type: Object as Company,
      required: true
    }
  },
  methods: {
    moveTo(): void {
      this.$router.push(`companies/${this.company.id}`)
    }
  }
}
</script>

<style scoped>
</style>