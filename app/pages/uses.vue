<script setup lang="ts">
import { uses } from '~/data'

useHead({
  title: 'Uses'
})
</script>

<template>
  <UContainer class="max-w-[760px] py-16 sm:py-24">
    <div class="mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-highlighted">
        Uses
      </h1>
      <p class="mt-3 text-muted">
        The stuff I use on a day-to-day basis.
      </p>
      <svg width="150" height="16" viewBox="0 0 150 16" fill="none" aria-hidden="true" class="block mt-3">
        <path d="M3 8 Q 9 1.5, 15 8 T 27 8 T 39 8 T 51 8 T 63 8 T 75 8 T 87 8 T 99 8 T 111 8 T 123 8 T 135 8 T 147 8" stroke="var(--color-orange-300)" stroke-width="3.5" stroke-linecap="round" fill="none" />
      </svg>
    </div>

    <div class="space-y-5">
      <div v-for="group in uses" :key="group.category" class="rounded-lg border border-default p-4 bg-white dark:bg-elevated">
        <h2 class="text-lg font-semibold mb-3">
          {{ group.category }}
        </h2>
        <ul>
          <li
            v-for="item in group.items"
            :key="item.name"
            class="flex items-start gap-3 py-1 px-0"
          >
            <p class="font-bold text-sm">
              {{ item.type }} —
            </p>
            <p class="text-muted text-sm">
              {{ item.name }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </UContainer>
</template>
