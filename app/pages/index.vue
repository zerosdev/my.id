<script setup lang="ts">
import { profile } from '~/data/profile'
import { experience } from '~/data/experience'
import { projects } from '~/data/projects'
import { skills } from '~/data/skills'
</script>

<template>
  <div>
    <UPageHero
      :headline="profile.headline"
      orientation="horizontal"
      :ui="{ title: 'lg:text-3xl', description: 'sm:text-base' }"
      :links="[
        { label: 'View Projects', to: '#projects', color: 'neutral' },
        { label: 'Download CV', to: profile.resumeUrl, target: '_blank', color: 'neutral', variant: 'subtle' }
      ]"
    >
      <template #title>
        Hey, I'm <span class="text-orange-400 dark:text-orange-300">{{ profile.name }}</span> <span class="inline-block">👋</span>
      </template>

      <template #description>
        {{ profile.role }} based in {{ profile.location }}. {{ profile.bio }}
      </template>

      <div class="flex justify-center lg:justify-end">
        <div class="relative inline-flex">
          <div
            aria-hidden="true"
            class="absolute inset-0 -z-10 m-auto size-56 lg:size-72 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-orange-300 opacity-40 blur-3xl dark:opacity-50"
          />
          <UAvatar
            :src="profile.avatar"
            :alt="profile.name"
            size="3xl"
            class="relative size-48 lg:size-64 ring-4 ring-default"
          />
        </div>
      </div>
    </UPageHero>

    <UPageSection
      id="technologies"
      title="Tech Stack"
      description="Technologies and tools I work with."
    >
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="group in skills" :key="group.category">
          <h3 class="font-semibold mb-3">
            {{ group.category }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="item in group.items"
              :key="item.name"
              :label="item.name"
              :icon="item.icon"
              color="neutral"
              variant="subtle"
            />
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      id="experience"
      title="Experience"
      description="My professional journey so far."
    >
      <UTimeline :items="experience">
        <template #title="{ item }">
          <p class="font-semibold">
            {{ item.title }}
          </p>
        </template>
        <template #description="{ item }">
          <p class="text-sm text-muted">
            {{ item.company }}
          </p>
          <p class="mt-1 text-sm">
            {{ item.description }}
          </p>
          <ul v-if="item.highlights?.length" class="mt-3 space-y-1.5">
            <li
              v-for="highlight in item.highlights"
              :key="highlight"
              class="flex items-start gap-2 text-sm text-muted"
            >
              <UIcon name="i-lucide-check" class="size-4 mt-0.5 shrink-0 text-highlighted" />
              {{ highlight }}
            </li>
          </ul>
        </template>
      </UTimeline>
    </UPageSection>

    <UPageSection
      id="projects"
      title="Projects"
      description="A selection of things I've built."
    >
      <UPageGrid>
        <UPageCard
          v-for="project in projects"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          :to="project.link"
          target="_blank"
          spotlight
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
      </UPageGrid>
    </UPageSection>

    <UPageCTA
      id="contact"
      title="Let's work together"
      description="I'm currently available for freelance work and new opportunities. Feel free to reach out."
      :links="[
        { label: 'Email Me', to: `mailto:${profile.email}`, icon: 'i-lucide-mail', color: 'neutral' },
        { label: 'Download CV', to: profile.resumeUrl, target: '_blank', color: 'neutral', variant: 'subtle' }
      ]"
      variant="subtle"
      class="mb-16"
    />
  </div>
</template>
