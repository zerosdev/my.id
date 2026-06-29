<script setup lang="ts">
import { projects } from '~/data'

useHead({
  title: 'Projects'
})

const ALL_TAGS = 'All'

const tagOptions = [ALL_TAGS, ...new Set(projects.flatMap((project) => project.tags))]
const selectedTag = ref(ALL_TAGS)

const filteredProjects = computed(() => selectedTag.value === ALL_TAGS
  ? projects
  : projects.filter((project) => project.tags.includes(selectedTag.value)))
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-highlighted">
        Projects
      </h1>
      <p class="mt-3 mb-3 text-muted">
        A selection of things I've built.
      </p>
      <ContentSeparator />
    </div>

    <div class="mb-6 flex justify-end">
      <USelect v-model="selectedTag" :items="tagOptions" class="w-48" />
    </div>

    <UPageGrid>
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.title"
        :project="project"
      />
    </UPageGrid>
  </UContainer>
</template>
