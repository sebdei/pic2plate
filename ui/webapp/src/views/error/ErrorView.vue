<template>
  <div class="container-fluid">
    <img :src="imageUrl" class="mw-100 mb-4" />

    <div class="d-flex justify-content-between">
      <RouterLink v-if="imageUrl" :to="{ name: 'RecipeView' }">
        <span class="material-icons md-64"> replay </span>
      </RouterLink>

      <NewRecipeCamera />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { recipeProposalStore } from '@/stores/recipeProposalStore'

import NewRecipeCamera from '@/components/recipe/NewRecipeCamera.vue'

const imageUrl = computed(() => recipeProposalStore.imageUrl)
</script>
