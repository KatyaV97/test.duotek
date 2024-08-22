<template>
  <div class="input-body">
    <img src="/public/loupe-icon.svg"/>
    <input
        :value="data = value"
        :placeholder="placeholder"
        class="main-input"
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainInput',
  emits: ['input'],
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '' as string,
      data: '' as string,
      focus: false as boolean,
    }
  }
}
</script>

<style scoped>
</style>