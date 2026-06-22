<script setup lang="ts">
import { navLinks, profile, social } from '~/data'
useHead({
  titleTemplate: (chunk?: string) => (chunk ? `${chunk} - ${profile.name}` : `${profile.name} - ${profile.role}`),
})

const initials = computed(() => profile.name
  .split(' ')
  .filter(Boolean)
  .map((word) => word[0])
  .splice(0, 2)
  .join('')
  .toUpperCase())
</script>

<template>
  <div>
    <UHeader :to="'/'">
      <template #title>
        {{ initials }}
      </template>

      <UNavigationMenu
        :items="navLinks.map((link) => ({ label: link.label, to: link.to }))"
        variant="link"
      />

      <template #right>
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
          :items="navLinks.map((link) => ({ label: link.label, to: link.to }))"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.
        </p>
      </template>

      <template #right>
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
