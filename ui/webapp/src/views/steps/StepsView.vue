<template>
  <div>
    <h2>{{ stepIndex + 1 }}</h2>

    <p>{{ step.description }}</p>

    <button @click="stepIndex - 1 >= 0 ? stepIndex-- : 0">Zurück</button>
    <button @click="stepIndex + 1 < recipe.steps.length ? stepIndex++ : 0">Weiter</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { recipeStore } from '@/stores/recipeStore'

const stepIndex = ref(0)
const recipe = computed(() => recipeStore.recipe)
const step = computed(() => recipe.value.steps[stepIndex.value])
</script>

<style scoped>
.wrapper {
  background-color: #eeeeee05;
}

.image {
  height: 35%;
  overflow: hidden;
}

.name {
  font-size: 2.5rem;
}

.ingredients ul {
  padding-left: 1rem;
}

button {
  font-size: 1.75rem;
}
</style>
