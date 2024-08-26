<template>
  <div class="input-body">
    <img
        src="/public/loupe-icon.svg"
        alt="Лупа"
    />
    <input
        :value="data = value"
        :placeholder="placeholder"
        @input="setValue($event.target.value)"
        class="main-input"
    >
    <div
        v-if="value
              && value.length > 0"
        @click.stop.prevent="clearInput"
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
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainInput',
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
  emits: ['input'],
  data() {
    return {
      title: '' as string,
      data: '' as string
    }
  },
  methods: {
    clearInput(): void {
      this.$emit('input', this.data = '')
    },
    setValue(value: string): void {
      this.data = value.trim()
      this.$emit('input', this.data)
    }
  }
}
</script>

<style scoped>
</style>