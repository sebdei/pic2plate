<template>
  <div class="header">
    <RouterLink :to="{ name: 'WelcomeView' }">
      <button type="button" class="bg-transparent border-0 button-muted">
        <span class="material-icons md-40"> arrow_back_ios_new </span>
      </button>
    </RouterLink>

    <img src="/img/header.jpg" />
  </div>

  <div class="recipe container-fluid d-flex flex-column pt-3 pb-5">
    <div class="mt-5 mb-2 mx-3">
      <h3 class="name">
        {{ recipe.name }}
      </h3>

      <span class="opacity-50">{{ recipe.duration }}</span>
    </div>

    <div class="mb-1 mx-3">
      <div class="mt-3">
        <h4>
          {{ t('ingredients') }}
        </h4>

        <ul class="mt-4 ps-3">
          <li class="pb-1" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
            {{ ingredient.amount }}
            {{ ingredient.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="my-4 mx-4 buttons d-flex justify-content-between">
      <button
        :disabled="recipeStore.history.length - recipeStore.historyPointer < 1"
        class="bg-transparent border-0 d-flex align-items-center button-muted"
        type="button"
        @click="previousRecipe()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="56" width="56" viewBox="0 -960 960 960">
          <path
            d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"
          />
        </svg>
      </button>

      <button
        :disabled="isFetching"
        class="bg-transparent border-0 d-flex align-items-center button-muted"
        type="button"
        @click="newRecipe()"
      >
        <span :class="{ spinner: isFetching }" class="material-icons md-56"> autorenew </span>
      </button>
    </div>

    <div class="mt-4 mb-2 mx-3">
      <StepList />
    </div>

    <div class="footer mb-2">
      <RouterLink :to="{ name: 'StepView' }">
        <button class="btn btn-lg btn-success text-center">Jetzt schrittweise kochen</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepList from './steps/StepList.vue'

import * as api from '@/service/api'
import { SUGGEST_RECIPE_URL } from '@/urls'
import { recipeStore } from '@/stores/recipeStore'

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const recipe = computed(() => recipeStore.recipe)

const isFetching = ref(false)

function previousRecipe() {
  recipeStore.historyPointer = recipeStore.historyPointer + 1
  recipeStore.recipe = recipeStore.history.at(-recipeStore.historyPointer)
}

async function newRecipe() {
  isFetching.value = true

  const data = {
    history: recipeStore.history.map((recipe: any) => recipe.name),
    ingredients: recipeStore.recognizedIngredients
  }

  const { error, recipe } = await api.post(SUGGEST_RECIPE_URL, data)

  if (recipe) {
    recipeStore.recipe = recipe
    recipeStore.historyPointer = 1
    recipeStore.history = [...recipeStore.history, recipe]
    window.scrollTo({ top: 20, behavior: 'smooth' })
  }

  isFetching.value = false
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  overflow: hidden;
}
.header a {
  position: absolute;
  top: 15px;
  z-index: 100;
}
.header button {
  color: white;
}

.header img {
  width: 130%;
  transform: translateY(-50px);
}

.recipe {
  position: relative;
  margin-top: -150px;
  z-index: 10;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

.image {
  height: 35%;
  overflow: hidden;
}

.image-top {
  min-height: 35%;
}

.name {
  font-size: 1.8rem;
}

.spinner-wrapper {
  height: 56px;
  width: 56px;
}

.spinner {
  animation: spinner-border 0.75s linear infinite;
}

button:disabled {
  opacity: 0.3;
}

.button-muted,
.button-muted svg {
  color: var(--bs-secondary-color);
  fill: var(--bs-secondary-color);
}

.footer button {
  width: 100%;
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
