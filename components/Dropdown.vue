<template>
  <div
      v-click-outside="closeDropdown"
      @click="toggleDropdown"
      class="dropdown-container"
  >
    <p
        v-if="title"
        class="title _non-space"
    >
      {{ title }}
    </p>
    <div class="main-dropdown">
      <p class="value _non-space">
        {{ value }}
      </p>
      <div
          v-if="!isOptionsShown
                && !defaultValue"
          @click.stop.prevent="clearOption"
          class="clear-ico"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
        >
          <path
              d="M9.85378 9.14628C9.90024 9.19274 9.93709 9.24789 9.96223
                    9.30859C9.98737 9.36928 10.0003 9.43434 10.0003 9.50003C10.0003
                    9.56573 9.98737 9.63079 9.96223 9.69148C9.93709 9.75218 9.90024
                    9.80733 9.85378 9.85378C9.80733 9.90024 9.75218 9.93709 9.69148
                    9.96223C9.63079 9.98737 9.56573 10.0003 9.50003 10.0003C9.43434
                    10.0003 9.36928 9.98737 9.30859 9.96223C9.24789 9.93709 9.19274
                    9.90024 9.14628 9.85378L5.00003 5.70691L0.853784 9.85378C0.759964
                    9.94761 0.632716 10.0003 0.500034 10.0003C0.367352 10.0003 0.240104
                    9.94761 0.146284 9.85378C0.0524635 9.75996 -0.000244138 9.63272
                    -0.000244141 9.50003C-0.000244143 9.36735 0.0524635 9.2401 0.146284
                    9.14628L4.29316 5.00003L0.146284 0.853784C0.0524635 0.759964 -0.000244141
                    0.632716 -0.000244141 0.500034C-0.000244141 0.367352 0.0524635 0.240104
                    0.146284 0.146284C0.240104 0.0524635 0.367352 -0.000244141 0.500034
                    -0.000244141C0.632716 -0.000244141 0.759964 0.0524635 0.853784
                    0.146284L5.00003 4.29316L9.14628 0.146284C9.2401 0.0524635 9.36735
                    -0.000244143 9.50003 -0.000244141C9.63272 -0.000244138 9.75996
                    0.0524635 9.85378 0.146284C9.94761 0.240104 10.0003 0.367352
                    10.0003 0.500034C10.0003 0.632716 9.94761 0.759964 9.85378
                    0.853784L5.70691 5.00003L9.85378 9.14628Z"
              fill="#252525"
          />
        </svg>
      </div>
      <svg
          :class="{
            '_open': isOptionsShown
          }"
          class="stroke"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M7.42259 9.57741C7.09715 9.25197 6.56951 9.25197 6.24408 9.57741C5.91864 9.90285 5.91864 10.4305 6.24408 10.7559L11.2441 15.7559C11.5695 16.0814 12.0972 16.0814 12.4226 15.7559L17.4226 10.7559C17.748 10.4305 17.748 9.90285 17.4226 9.57741C17.0972 9.25197 16.5695 9.25197 16.2441 9.57741L11.8333 13.9882L7.42259 9.57741Z"
            fill="#030953"/>
      </svg>
    </div>
    <div
        :class="{
          '_show': isOptionsShown
        }"
        class="options-block"
    >
      <div
          v-for="option in options"
          :key="option.id"
          :class="{
            '_active': option.isActive
          }"
          @click.stop.prevent="selectOption(option)"
          class="option"
      >
        <p class="value _non-space">
          {{ option.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type {Option} from "~/types/company"

export default {
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    defaultValue: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectItem', 'clearOption'],
  data() {
    return {
      isOptionsShown: false as boolean
    }
  },
  methods: {
    toggleDropdown(): void {
      this.isOptionsShown = !this.isOptionsShown
    },
    closeDropdown(): void {
      this.isOptionsShown = false
    },
    selectOption(option: Option): void {
      this.$emit('selectItem', option)
      this.toggleDropdown()
    },
    clearOption(): void {
      this.$emit('clearOption')
    }
  }
}
</script>

<style scoped>
</style>