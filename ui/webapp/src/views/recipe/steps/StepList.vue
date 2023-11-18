<template>
  <div>
    <div class="d-flex flex-column">
      <div v-for="(step, stepIndex) in recipe.steps" :key="stepIndex" class="mb-5">
        <div class="d-flex align-items-center justify-content-center mb-3">
          <hr class="flex-grow-1" />

          <div class="px-4">
            <h3>{{ t('step', { stepIndex: stepIndex + 1 }) }}</h3>
          </div>

          <hr class="flex-grow-1" />
        </div>

        <p>{{ step?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { recipeStore } from '@/stores/recipeStore'
const recipe = computed(() => recipeStore.recipe)
</script>

<style scoped></style>

<i18n>
{
  "de": {
    step: "{stepIndex}. Schritt",
  },
  "en": {
    step: "{stepIndex}. Step",
  }
}
</i18n>
