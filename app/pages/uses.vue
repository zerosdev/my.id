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
    </div>

    <div class="space-y-12">
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
