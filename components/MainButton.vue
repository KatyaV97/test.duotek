<template>
  <button
      :class="{
          '_dark-blue': classes.includes('dark-blue'),
          '_pink': classes.includes('pink')
      }"
      class="main-btn"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  name: "MainButton",
  props: {
    classes: {
      type: Array as string[],
      required: true
    }
  }
}
</script>

<style scoped>
</style>