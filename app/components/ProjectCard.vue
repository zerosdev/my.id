<script setup lang="ts">
import type { Project } from '~/data/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <UPageCard
    :title="project.title"
    :description="project.description"
    :to="project.link"
    target="_blank"
    spotlight
    :ui="{ title: 'text-black dark:text-white underline decoration-orange-300 underline-offset-4' }"
  >
    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in project.tags"
          :key="tag"
          :label="tag"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </div>
    </template>
  </UPageCard>
</template>
