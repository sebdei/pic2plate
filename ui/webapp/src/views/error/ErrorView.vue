<template>
  <div class="container-fluid">
    <img :src="imageUrl" class="mw-100 mb-4" />

    <div class="text-center mb-3">
      <p class="fs-5">
        {{ t('did_not_work') }}
      </p>

      <p class="fs-5">
        {{ t('retry_or_photo') }}
      </p>
    </div>

    <div class="d-flex justify-content-around">
      <RouterLink v-if="imageUrl" :to="{ name: 'RecipeView' }">
        <MaterialSymbol icon="replay" :size="64" />
      </RouterLink>

      <NewRecipeCamera />
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialSymbol from '@/components/icon/MaterialSymbol.vue'
import NewRecipeCamera from '@/components/recipe/NewRecipeCamera.vue'

import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { recipeProposalStore } from '@/stores/recipeProposalStore'

const imageUrl = computed(() => recipeProposalStore.imageUrl)
</script>

<i18n>
{
  "de": {
    "did_not_work": "Dies hat leider nicht funktioniert 😟",
    "retry_or_photo": "Versuche es entweder nochmal oder lade ein anderes Foto hoch.",
  },
  "en": {
    "did_not_work": "This did not work 😟",
    "retry_or_photo": "Either try again or upload a different photo.",
  }
}
</i18n>
