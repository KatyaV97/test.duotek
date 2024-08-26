<template>
  <div
      class="universal-alert _hidden"
      @mouseenter="onFocus"
      @mouseleave="onBlur"
      :class="
        {
          '_show': isShown,
          '_done': !isShown && value && value.length > 0
        }"
  >
    <div class="alert-message">
      {{ value }}
    </div>
    <div
        class="alert-close"
        @click="closeAlert"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
      >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237
            6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834
            4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342
            19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071
            17.2929C19.0976 17.6834 19.0976 18.3166 18.7071
            18.7071C18.3166 19.0976 17.6834 19.0976 17.2929
            18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976
            5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237
            17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237
            6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="white"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Alert",
  emits: ['closeAlert'],
  props: {
    isError: {
      type: Boolean,
      default: false,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShown: false,
      time: 60000,
      isFocused: false as boolean
    }
  },
  methods: {
    onFocus(): void {
      this.isFocused = true
    },
    onBlur(): void {
      this.isFocused = false
    },
    closeAlert(): void {
      this.isShown = false
      setTimeout(() => {
        this.$emit('closeAlert', false)
      }, 600)
    },
    closeByTime(): void {
      setTimeout(() => {
        this.closeAlert()
      }, this.time)
    },
    showAlert(): void {
      this.isShown = true
      this.closeByTime()
    }
  },
  watch: {
    isError: {
      handler(newVal: boolean, oldVal: boolean): void {
        if (newVal) {
          this.showAlert()
        }
      }
    },
    focus() {
      if (this.isFocused) {
        this.time += 2000
      }
    }
  },
  mounted() {
    if (this.isError) {
      this.showAlert()
    }
  }
}
</script>

<style scoped>
</style>