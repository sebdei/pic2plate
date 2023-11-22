<template>
  <RecipeLoading v-if="!recipe && imageUrl" />

  <div v-else-if="recipe">
    <div class="header">
      <RouterLink :to="{ name: 'WelcomeView' }">
        <button class="bg-transparent border-0 button-muted mx-2">
          <MaterialSymbol icon="arrow_back_ios" fill="white" :size="40" />
        </button>
      </RouterLink>

      <img src="/img/header.jpg" />
    </div>

    <div class="recipe container-fluid d-flex flex-column pt-3 pb-5">
      <div class="mt-5 mb-2 mx-3">
        <h1>
          {{ recipe.name }}
        </h1>

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

      <div class="my-4 mx-4 buttons d-flex justify-content-around">
        <button
          :disabled="recipeProposalStore.history.length - currentRecipeIndex < 1"
          class="bg-transparent border-0 d-flex align-items-center button-muted"
          type="button"
          @click="previousRecipe()"
        >
          <MaterialSymbol icon="undo" :size="56" />
        </button>

        <button
          :disabled="isFetching"
          class="bg-transparent border-0 d-flex align-items-center"
          type="button"
          @click="nextRecipe()"
        >
          <MaterialSymbol :class="{ spinner: isFetching }" icon="autorenew" :size="56" />
        </button>
      </div>

      <div class="mt-4 mb-2 mx-3">
        <StepList :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialSymbol from '@/components/icon/MaterialSymbol.vue'
import RecipeLoading from './loading/RecipeLoading.vue'
import StepList from './steps/StepList.vue'

import * as api from '@/service/api'
import { SUGGEST_RECIPE_URL } from '@/urls'
import { recipeProposalStore } from '@/stores/recipeProposalStore'

import { computed, ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const currentRecipeIndex = ref(-1)
const isFetching = ref(false)

const recipe = computed(() => recipeProposalStore.history[currentRecipeIndex.value])
const imageUrl = computed(() => recipeProposalStore.imageUrl)

function previousRecipe() {
  currentRecipeIndex.value = Math.max(0, currentRecipeIndex.value - 1)
}

onMounted(() => {
  if (recipeProposalStore.history.length) {
    currentRecipeIndex.value = recipeProposalStore.history.length - 1
  } else if (imageUrl.value) {
    nextRecipe()
  } else {
    // sic! For now, we just redirect to the welcome view. In the future, we should create a view for creating a recipe with photo i.e. similar to WelcomeView
    router.push({ name: 'WelcomeView' })
  }
})

function createRecipeRequestDto() {
  const result: any = {}

  result.history = recipeProposalStore.history.map((recipe: any) => recipe.name)

  if (recipeProposalStore.imageIngredients?.length) {
    result.ingredients = recipeProposalStore.imageIngredients
  } else {
    result.image_data_url = imageUrl.value
  }

  return result
}

async function nextRecipe() {
  isFetching.value = true

  const dto = createRecipeRequestDto()
  const { error, image_ingredients, recipe } = await api.post(SUGGEST_RECIPE_URL, dto)

  if (error) {
    router.push({ name: 'ErrorView' })
  } else {
    if (image_ingredients) {
      const imageIngredients = [...recipeProposalStore.imageIngredients, ...image_ingredients]
      recipeProposalStore.imageIngredients = imageIngredients
    }

    if (recipe) {
      recipeProposalStore.history.push(recipe)
      currentRecipeIndex.value++

      window.scrollTo({ top: 20, behavior: 'smooth' })
    }
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
.header img {
  width: 130%;
  transform: translateY(-50px);
}

.recipe {
  position: relative;
  margin-top: -150px;
  z-index: 10;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.image {
  height: 35%;
  overflow: hidden;
}

.image-top {
  min-height: 35%;
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

/* .button-muted,
.button-muted svg {
  color: var(--bs-secondary-color);
  fill: var(--bs-secondary-color);
} */

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
