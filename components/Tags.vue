<template>
  <div class="company-tags">
    <div
        v-for="tag in tags"
        :key="tag.id"
        class="tag-block"
    >
      <p class="_non-space">
        {{ tag.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type {Tag} from "~/types/company"

export default {
  name: 'Tags',
  props: {
    tags: {
      type: Array as Tag[],
      required: true
    }
  }
}
</script>

<style scoped>
</style>