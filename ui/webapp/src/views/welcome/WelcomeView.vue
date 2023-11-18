lea
<template>
  <div class="container-fluid text-center">
    <img src="/img/pic2plate.png" class="mw-100 mb-4 p-5" />

    <h3 class="mb-5">
      {{ t('welcome') }}
    </h3>

    <div class="d-flex align-items-center justify-content-around image-selection">
      <ImageDataUrlLoader v-if="!isFetching" :max-height="1920" @change="submitImage" />
      <LoadingIndicator v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageDataUrlLoader from '@/components/input/ImageDataUrlLoader.vue'
import LoadingIndicator from '@/components/loading/LoadingIndicator.vue'
import * as api from '@/service/api'
import { SUGGEST_RECIPE_URL } from '@/urls'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { recipeStore } from '../../stores/recipeStore'

const { t } = useI18n()
const router = useRouter()
const isFetching = ref(false)

const submitImage = async (imageDataUrl: string) => {
  recipeStore.imageUrl = imageDataUrl
  isFetching.value = true

  const data = { image_data_url: imageDataUrl }
  const { error, recipe, recognizedIngredients } = await api.post(SUGGEST_RECIPE_URL, data)

  if (error) {
    router.push({ name: 'ErrorView' })
  } else {
    recipeStore.recipe = recipe
    recipeStore.recognizedIngredients = recognizedIngredients
    recipeStore.history = [...recipeStore.history, recipe.name]
    router.push({ name: 'RecipeView' })
  }
}
</script>

<style scoped>
.image-selection {
  height: 120px;
}

.image img {
  height: 300px;
}

.white-space-preline {
  white-space: pre-line;
}
</style>

<i18n>
{
  "de": {
    "welcome": "Einfach ein Bild von Zutaten machen, um dein Rezept zu erstellen!"
  },
  "en": {
    "welcome": "Just take a picture of ingredients to get your recipe!"
  }
}
</i18n>
