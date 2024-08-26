<template>
  <div class="contact-info-block">
    <img
        v-if="company.data?.picture"
        :src="company.data.picture"
        class="logo-company"
        alt="Лого компании"
    />
    <div class="info">
      <p class="title _non-space">
        Сайт:
      </p>
      <a
          :href="company.data.url"
          target="_blank"
          class="link _non-space"
      >
        {{ company.data.url }}
      </a>
    </div>
    <div class="info">
      <p class="title _non-space">
        E-mail:
      </p>
      <p class="link _non-space">
        {{ company.data.contact_email }}
      </p>
    </div>
    <div class="info">
      <p class="title _non-space">
        Телефон:
      </p>
      <p class="text _non-space">
        {{ formatPhoneNumber(company.data.contact_phone) }}
      </p>
    </div>
    <div class="info">
      <p class="text _non-space">
        Офис:
      </p>
      <p class="text _non-space">
        {{ company.data.city.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BusinessCard',
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPhoneNumber(phoneNumber: string): string {
      if (!phoneNumber) return ''
      const num = phoneNumber.split('')
      return `+${num[0]} ${num[1] + num[2] + num[3]} ` +
          `${num[4] + num[5] + num[6]} ${num[7] + num[8]}` +
          `${num[9] + num[10]}`
    }
  }
}
</script>

<style scoped>
</style>