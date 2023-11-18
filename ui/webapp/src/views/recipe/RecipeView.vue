<template>
  <div class="container-fluid d-flex flex-column vh-100 pb-5">
    <button @click="newRecipe()">NOCHMAL!!!</button>
    <div class="my-5 ms-5 me-5">
      <h2 class="name">
        {{ recipe!.name }}
      </h2>
    </div>

    <div class="mb-5 ms-5 me-5">
      <div class="mt-3">
        <h3>
          {{ t('ingredients') }}
        </h3>

        <ul class="mt-4 ps-3">
          <li class="pb-1" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
            {{ ingredient.amount }} {{ ingredient.description }}
          </li>
        </ul>
      </div>
    </div>

    <StepList />
  </div>
</template>

<script setup lang="ts">
import * as api from '@/service/api'
import { recipeStore } from '@/stores/recipeStore'
import { SUGGEST_RECIPE_URL } from '@/urls'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StepList from './steps/StepList.vue'

const { t } = useI18n()

const recipe = computed(() => recipeStore.recipe)

async function newRecipe() {
  const data = {
    history: recipeStore.history,
    ingredients: recipeStore.recognizedIngredients
  }

  const { error, recipe } = await api.post(SUGGEST_RECIPE_URL, data)

  recipeStore.recipe = recipe
  recipeStore.history = [...recipeStore.history, recipe.name]
}
</script>

<style scoped>
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
