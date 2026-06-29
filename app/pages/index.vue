<script setup lang="ts">
import { experience, profile, projects, skills } from '~/data'

const { trackEvent } = useAnalytics()
const latestProjects = projects.slice(0, 3)
</script>

<template>
  <div>
    <UPageHero
      id="about"
      :headline="profile.headline"
      orientation="horizontal"
      :ui="{ title: 'text-3xl sm:text-3xl lg:text-3xl', description: 'text-base sm:text-base lg:text-base' }"
      :links="[
        { label: 'View Projects', to: '#projects', color: 'neutral' },
        { label: 'Download CV', to: profile.resumeUrl, target: '_blank', color: 'neutral', variant: 'subtle', onClick: () => trackEvent('download_cv', { location: 'hero' }) }
      ]"
    >
      <template #headline>
        <UBadge v-if="profile.headline" color="success" variant="outline" size="sm" class="gap-1.5 rounded-full">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span class="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          {{ profile.headline }}
        </UBadge>
      </template>

      <template #title>
        Hey, I'm <span class="text-orange-400">{{ profile.name }}</span> <span class="inline-block">👋</span>
      </template>

      <template #description>
        A <span class="text-highlighted">{{ formatRoles(profile.roles) }}</span> based in <span class="text-highlighted">{{ profile.location }}</span>. {{ profile.bio }}
      </template>

      <div class="flex justify-center lg:justify-end">
        <div class="relative inline-flex">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-orange-200 via-amber-100 to-orange-50 opacity-50 blur-[110px] dark:from-orange-900 dark:via-amber-900 dark:to-orange-950 dark:opacity-30"
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
      id="skills"
      title="Skills"
      description="The technologies, tools, programming languages, frameworks or libraries I work with. Not a complete list — I'm always open to learn new things"
      :ui="{ title: 'text-left sm:text-3xl lg:text-3xl', description: 'font-light text-left text-base text-wrap sm:text-base lg:text-base max-w-[80ch]', container: 'sm:gap-5' }"
    >
      <ContentSeparator />
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
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
              class="bg-white dark:bg-elevated p-2 rounded-xl"
            />
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      id="experience"
      title="Experience"
      description="A look at the companies I've worked with, the products I've built, and the impact I've made."
      :ui="{ title: 'text-left sm:text-3xl lg:text-3xl', description: 'font-light text-left text-base text-wrap sm:text-base lg:text-base max-w-[80ch]', container: 'sm:gap-5' }"
    >
      <ContentSeparator />
      <UTimeline :items="experience">
        <template #title="{ item }">
          <p class="font-semibold text-md">
            {{ item.title }}
          </p>
        </template>
        <template #description="{ item }">
          <p class="text-sm text-muted mt-1">
            <span class="text-highlighted">{{ item.company }}</span> &middot; {{  item.location  }} &middot; {{ item.employment_type }}
          </p>
          <p class="mt-3 text-sm">
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
      :ui="{ title: 'text-left sm:text-3xl lg:text-3xl', description: 'text-left text-base sm:text-base text-wrap lg:text-base max-w-[80ch]', container: 'sm:gap-5' }"
    >
      <ContentSeparator />
      <UPageGrid>
        <ProjectCard
          v-for="project in latestProjects"
          :key="project.title"
          :project="project"
        />
      </UPageGrid>
      <div class="flex justify-center">
        <UButton
          label="View All Projects"
          to="/projects"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </UPageSection>
  </div>
</template>
