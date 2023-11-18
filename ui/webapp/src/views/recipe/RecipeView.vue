<template>
  <div class="d-flex flex-column vh-100 pb-5">
    <div class="mt-5 ms-5 me-5">
      <h2 class="name">
        {{ recipe!.name }}
      </h2>
    </div>

    <div class="mt-4 ms-5 me-5">
      <div class="mt-3 ingredients">
        <h3>
          {{ t('ingredients') }}
        </h3>

        <ul class="mt-4">
          <li
            class="ingredient pb-1"
            v-for="ingredient in recipe!.ingredients"
            :key="ingredient.name"
          >
            {{ ingredient.amount }} {{ ingredient.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-auto pb-5">
      <RouterLink :to="{ name: 'StepsView' }">
        <button type="button" class="btn btn-success btn-lg">
          {{ t('start') }}
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { recipeStore } from '@/stores/recipeStore'

const recipe = computed(() => recipeStore.recipe)
</script>

<style scoped>
.wrapper {
  background-color: #eeeeee05;
}

.image {
  height: 35%;
  overflow: hidden;
}

.image-top {
  min-height: 35%;
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

<i18n>
{
  "de": {
    ingredients: "Zutaten",
    start: "Los geht's!"
  },
  "en": {
    ingredients: "Ingredients",
    start: "Let's go!"
  }
}
</i18n>
