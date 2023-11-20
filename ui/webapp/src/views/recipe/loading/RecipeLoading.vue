<template>
  <div class="container-fluid text-center">
    <img src="/img/pic2plate.png" class="mw-100 mb-4 p-5" />

    <p class="mb-5 text-medium">
      {{ t('creating_your_recipe') }}
    </p>

    <div class="d-flex align-items-center justify-content-around">
      <LoadingIndicator />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingIndicator from '@/components/loading/LoadingIndicator.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
p {
  font-size: 1.5rem;
}
</style>

<i18n>
{
  "de": {
    "creating_your_recipe": "Dein Rezept wird erstellt..."
  },
  "en": {
    "creating_your_recipe": "Creating your recipe..."
  }
}
</i18n>
