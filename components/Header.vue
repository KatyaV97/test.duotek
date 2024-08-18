<template>
  <header id="header">
    <div class="top-content">
      <div class="left-side">
        <NuxtLink
            to="#"
        >
          <nuxt-img
              src="/logo-main.svg"
              class="logo"
              alt="logo"
          />
        </NuxtLink>
      </div>
      <div class="center">
        <ul class="center-ul">
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
              to="#"
          >
            <li
                :class="{
                  '_active' : activeTab === 0
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
                  '_active' : activeTab === 0
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
                  '_active' : activeTab === 0
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
                  '_active' : activeTab === 0
                }"
                class="menu-item"
            >
              Блог
            </li>
          </NuxtLink>
        </ul>
      </div>
      <div class="right-side">
        <NuxtLink
            to="#"
        >
          Вход и регистрация
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "Header",
  props:{
    activeTab: {
      type: Number,
      default: 99
    }
  }
}
</script>

<style scoped>
</style>