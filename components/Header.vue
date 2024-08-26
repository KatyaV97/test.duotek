<template>
  <header
      :class="{'_dark': isDarkTheme}"
      id="header"
  >
    <ul class="top-content">
      <NuxtLink
          to="/"
      >
        <li>
          <nuxt-img
              v-if="isDarkTheme"
              src="/logo-main-for-dark.svg"
              class="logo"
              alt="logo"
          />
          <nuxt-img
              v-else
              src="/logo-main.svg"
              class="logo"
              alt="logo"
          />
        </li>
      </NuxtLink>
        <perfect-scrollbar
            :options="{
                     wheelPropagation: false,
                     suppressScrollY: true,
                     useBothWheelAxes: true
                  }"
            class="center"
        >
        <NuxtLink
            to="#"
        >
          <li
              :class="{
                  '_active' : activeTab === 0
              }"
              class="menu-item"
          >
            Тендеры
          </li>
        </NuxtLink>
        <NuxtLink
            to="/companies"
        >
          <li
              :class="{
                  '_active' : activeTab === 1
              }"
              class="menu-item"
          >
            Компании
          </li>
        </NuxtLink>
        <NuxtLink
            to="#"
        >
          <li
              :class="{
                  '_active' : activeTab === 2
                }"
              class="menu-item"
          >
            Продукты
          </li>
        </NuxtLink>
        <NuxtLink
            to="#"
        >
          <li
              :class="{
                  '_active' : activeTab === 3
                }"
              class="menu-item"
          >
            Кейсы
          </li>
        </NuxtLink>
        <NuxtLink
            to="#"
        >
          <li
              :class="{
                  '_active' : activeTab === 4
                }"
              class="menu-item"
          >
            Блог
          </li>
        </NuxtLink>
      </perfect-scrollbar>
      <NuxtLink
          to="#"
      >
        <li class="menu-item">
          Вход и регистрация
        </li>
      </NuxtLink>
    </ul>
    <div class="line"/>
  </header>
</template>

<script lang="ts">
import {PerfectScrollbar} from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/style.css'

export default {
  name: "Header",
  components: {
    PerfectScrollbar
  },
  props: {
    activeTab: {
      type: Number,
      default: 99
    },
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>