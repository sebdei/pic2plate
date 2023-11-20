<template>
  <div class="container-fluid">
    <img :src="imageUrl" class="mw-100 mb-4" />

    <div class="text-center mb-3">
      <p class="fs-5">
        {{ t('did_not_work') }}
      </p>

      <p class="fs-5">
        {{ t('blame') }}
      </p>

      <p class="fs-5">
        {{ t('retry_or_photo') }}
      </p>
    </div>

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

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { recipeProposalStore } from '@/stores/recipeProposalStore'

import NewRecipeCamera from '@/components/recipe/NewRecipeCamera.vue'

const imageUrl = computed(() => recipeProposalStore.imageUrl)
</script>

<i18n>
{
  "de": {
    "blame": "Vermutlich hat GPT zu lange für die Antwort gebraucht.",
    "did_not_work": "Dies hat leider nicht funktioniert 😟",
    "retry_or_photo": "Du kannst es entweder nochmal mit dem gleichen Foto versuchen oder ein anderes hochladen.",
  },
  "en": {
    "blame": "Most likely, GPT took too long to respond.",
    "did_not_work": "This did not work 😟",
    "retry_or_photo": "You can either try again with the same photo or upload a different one.",
  }
}
</i18n>
