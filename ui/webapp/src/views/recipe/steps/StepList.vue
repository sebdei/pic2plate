<template>
  <div>
    <div class="d-flex flex-column">
      <div v-for="(step, stepIndex) in props.recipe.steps" :key="stepIndex" class="mb-5">
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps(['recipe'])
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
