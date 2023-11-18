<template>
  <div>
    <h2>{{ stepIndex + 1 }}</h2>

    <p>{{ currentStep?.description }}</p>

    <button :disabled="stepIndex === 0" @click="stepIndex--">Zurück</button>
    <button :disabled="stepIndex >= totalSteps - 1" @click="stepIndex++">Weiter</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { recipeStore } from '@/stores/recipeStore'

const stepIndex = ref(0)
const currentStep = computed(() => recipeStore.recipe.steps[stepIndex.value])
const totalSteps = computed(() => recipeStore.recipe.steps.length)
</script>

<style scoped></style>
