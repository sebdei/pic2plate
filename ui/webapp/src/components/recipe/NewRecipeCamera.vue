<template>
  <ImageDataUrlLoader :max-height="1920" @change="setImage" />
</template>

<script setup lang="ts">
import ImageDataUrlLoader from '@/components/input/ImageDataUrlLoader.vue'

import { clearProposalStore, recipeProposalStore } from '@/stores/recipeProposalStore'

import { useRouter } from 'vue-router'
const router = useRouter()

const setImage = async (imageDataUrl: string) => {
  clearProposalStore()
  recipeProposalStore.imageUrl = imageDataUrl

  router.push({ name: 'RecipeView' })
}
</script>
