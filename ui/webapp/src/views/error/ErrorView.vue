<template>
  <div class="container-fluid">
    <img :src="imageDataUrl" class="mw-100 mb-4" />

    <div v-if="!isFetching" class="d-flex justify-content-between">
      <span class="material-icons md-64" @click="submitImage"> replay </span>
      <ImageDataUrlLoader @change="setAndSubmit" />
    </div>

    <div v-else class="d-flex justify-content-center">
      <LoadingIndicator />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import * as api from '@/service/api'
import { SUGGEST_RECIPE_URL } from '@/urls'
import { recipeStore } from '@/stores/recipeStore'

import ImageDataUrlLoader from '@/components/input/ImageDataUrlLoader.vue'
import LoadingIndicator from '@/components/loading/LoadingIndicator.vue'

const router = useRouter()
const isFetching = ref(false)
const imageDataUrl = computed(() => recipeStore.imageUrl)

const setAndSubmit = (dataUrl: string) => {
  imageDataUrl.value = dataUrl
}

const submitImage = async () => {
  isFetching.value = true

  const data = { image_data_url: imageDataUrl.value }
  const { error, ...recipe } = await api.post(SUGGEST_RECIPE_URL, data)

  if (error) {
    console.log('error')
  } else {
    recipeStore.recipe = recipe
    router.push({ name: 'RecipeView' })
  }
}
</script>
