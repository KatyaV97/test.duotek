<template>
  <footer id="footer">
    <div class="line"/>
    <div class="bottom-content">
      <div class="services-content">
        <div
            v-for="(services, colIndex) in getFooterLinks()"
            :key="services.title"
            class="column-content"
        >
          <p class="title _non-space">
            {{ services.title }}
          </p>
          <template
              v-for="(link, index) in services.links"
              :key="link.name + index"
          >
            <MainButton
                v-if="link.isButton"
                :classes="colIndex === 0
                ? ['dark-blue']
                  : colIndex === 1
                    ? ['pink'] : []"
            >
              {{ link.name }}
            </MainButton>
            <NuxtLink
                v-else
                :to="link.url"
                class="footer-item"
            >
              {{ link.name }}
            </NuxtLink>
          </template>
        </div>
      </div>
      <div class="external-links">
        <div class="left">
          <a href="#">
            <img
                src="/public/facebook-icon.svg"
                alt="Ссылка на Facebook"
            />
          </a>
          <a href="#">
            <img
                src="/public/vk-icon.svg"
                alt="Ссылка на Вконтакте"
            />
          </a>
          <a href="#">
            <img
                src="/public/youtube-icon.svg"
                alt="Ссылка на Youtube"
            />
          </a>
        </div>
        <div class="right">
          <a href="#" class="footer-link">
            О проекте
          </a>
          <a href="#" class="footer-link">
            Пользовательское соглашение
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import {FOOTER_LINKS} from "~/constants/footerLinks"

export default {
  name: "Footer",
  methods: {
    getFooterLinks() {
      return FOOTER_LINKS
    }
  }
}
</script>

<style scoped>
</style>