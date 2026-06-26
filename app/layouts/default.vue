<script setup lang="ts">
import { profile, social } from '~/data'
import type { NavLink } from '~/data/types';
useHead({
  titleTemplate: (chunk?: string) => (chunk ? `${chunk} — ${profile.name}` : `${profile.name} — ${profile.role}`),
})

const navLinks: NavLink[] = [
  {
    label: "About",
    to: "/#about"
  },
  {
    label: "Skills",
    to: "/#skills"
  },
  {
    label: "Experience",
    to: "/#experience"
  },
  {
    label: "Projects",
    to: "/#projects"
  },
  {
    label: "Contact",
    to: "#contact"
  }
]

const initials = computed(() => profile.name
  .split(' ')
  .filter(Boolean)
  .map((word) => word[0])
  .join('')
  .toUpperCase())
</script>

<template>
  <div>
    <UHeader :to="'/'">
      <template #title>
        {{ initials }}
      </template>

      <template #right>
        <UNavigationMenu
          :items="navLinks.map((link) => ({ label: link.label, to: link.to, exactHash: true }))"
          variant="link"
          :ui="{ link: 'uppercase text-[.8rem]' }"
        />
        <UColorModeButton />
        <UButton
          v-for="item in social"
          :key="item.label"
          :icon="item.icon"
          :to="item.to"
          :aria-label="item.label"
          target="_blank"
          color="neutral"
          variant="ghost"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navLinks.map((link) => ({ label: link.label, to: link.to, exactHash: true }))"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />

      <UPageCTA
        id="contact"
        title="Let's build something great together!"
        description="I'm currently available for freelance projects and exciting opportunities. If you have an idea, project, or role in mind, I'd love to hear from you."
        :links="[
          { to: `mailto:${profile.email}`, icon: 'i-lucide-mail', color: 'neutral' },
          { to: `https://wa.me/${profile.whatsapp}`, icon: 'i-uil-whatsapp', color: 'neutral' },
          { to: `https://t.me/${profile.telegram}`, icon: 'i-uil-telegram', color: 'neutral' },
          { label: 'Download CV', to: profile.resumeUrl, target: '_blank', color: 'neutral', variant: 'subtle' }
        ]"
        variant="subtle"
      />

    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ profile.name }}. Powered by <a href="https://nuxt.com" rel="nofollow, noopener" class="text-black dark:text-white underline decoration-orange-300 underline-offset-4">Nuxt 4</a> & <a href="https://cloudflare.com" rel="nofollow, noopener" class="text-black dark:text-white underline decoration-orange-300 underline-offset-4">Cloudflare Workers</a>
        </p>
      </template>

      <template #right>
        <UButton
          label="Uses"
          to="/uses"
          color="neutral"
          variant="ghost"
          size="sm"
        />
        <UButton
          v-for="item in social"
          :key="item.label"
          :icon="item.icon"
          :to="item.to"
          :aria-label="item.label"
          target="_blank"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </template>
    </UFooter>
  </div>
</template>
