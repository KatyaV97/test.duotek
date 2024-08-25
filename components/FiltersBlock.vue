<template>
  <div
      v-if="definitions"
      class="filters-block"
  >
    <Dropdown
        v-if="definitions?.Industry"
        :options="definitions.Industry"
        :value="value.Industry"
        :default-value="isDefaultValue('Все отрасли', 'Industry')"
        @clear-option="clearOption('Industry'); clearFilter('industry')"
        @select-item="toggleIndustryItem"
        title="Отрасль"
    />
    <Dropdown
        v-if="definitions?.CompanySpecialization"
        :options="definitions.CompanySpecialization"
        :value="value.CompanySpecialization"
        :default-value="isDefaultValue('Все специализации', 'CompanySpecialization')"
        @clear-option="clearOption('CompanySpecialization'); clearFilter('specialization')"
        @select-item="toggleSpecializationItem"
        title="Специализация"
    />
  </div>
</template>

<script lang="ts">
import type {Industry, CompanySpecialization} from "~/types/company"

type DefaultValue = {
  CompanySpecialization: string,
  Industry: string
}

export default {
  name: 'FilterBlock',
  props: {
    initialIndustryValue: {
      type: String,
      default: ''
    },
    initialCompanySpecializationValue: {
      type: String,
      default: ''
    }
  },
  emits: ['initFilter', 'clearFilter'],
  async setup() {
    const {pending: definitionsPending, data: definitions} = await useFetch('/api/companies/getDefinitions',
        {
          lazy: true,
          server: false
        })

    return {
      definitions,
      definitionsPending
    }
  },
  data() {
    return {
      value: {
        CompanySpecialization: 'Все специализации',
        Industry: 'Все отрасли'
      } as DefaultValue,
      defaultValue: {
        CompanySpecialization: 'Все специализации',
        Industry: 'Все отрасли'
      } as DefaultValue,
    }
  },
  methods: {
    clearOption(name: string): void {
      this.definitions[name].forEach((definition: Industry | CompanySpecialization): void => {
        definition.isActive = false
      })
      this.value[name] = this.defaultValue[name]
    },
    clearFilter(name: string): void {
      this.$emit('clearFilter', name)
    },
    toggleIndustryItem(option: Industry | CompanySpecialization): void {
      this.setActive(option, 'Industry')
      this.$emit('initFilter', {
        industry: option.id
      })
    },
    toggleSpecializationItem(option: Industry | CompanySpecialization): void {
      this.setActive(option, 'CompanySpecialization')
      this.$emit('initFilter', {
        specialization: option.id
      })
    },
    setActive(option: Industry | CompanySpecialization, name: string): void {
      this.definitions[name].forEach((definition: Industry | CompanySpecialization): void => {
        definition.isActive = definition.id === option.id
        if (definition.isActive) {
          this.value[name] = definition.title
        }
      })
    },
    isDefaultValue(value: string, name: string): boolean {
      return this.value[name] === value
    },
    initInitialValue(value: string, name: string) {
      if (value) {
        const index = this.definitions[name].findIndex((item: Industry | CompanySpecialization): boolean => {
          return item.id === Number(value)
        })
        if (index !== -1) {
          this.value[name] = this.definitions[name][index].title
          this.setActive(this.definitions[name][index], name)
        }
      }
    }
  },
  mounted() {
    if (this.definitions) {
      this.initInitialValue(this.initialIndustryValue, 'Industry')
      this.initInitialValue(this.initialCompanySpecializationValue, 'CompanySpecialization')
    }
  },
  watch: {
    definitionsPending: {
      handler(newVal: Ref<boolean>): void {
        if (newVal) return

        this.initInitialValue(this.initialIndustryValue, 'Industry')
        this.initInitialValue(this.initialCompanySpecializationValue, 'CompanySpecialization')
      }
    },
    initialIndustryValue: {
      handler(newVal: string): void {
        this.initInitialValue(this.initialIndustryValue, 'Industry')
      }
    },
    initialCompanySpecializationValue: {
      handler(newVal: string): void {
        this.initInitialValue(this.initialCompanySpecializationValue, 'CompanySpecialization')
      }
    }
  }
}
</script>

<style scoped>
</style>