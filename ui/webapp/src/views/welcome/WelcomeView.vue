<template>
  <div class="container-fluid text-center">
    <img src="/img/pic2plate.png" class="mw-100 mb-4 p-5" />

    <p class="mb-5 fs-2">
      {{ t('welcome') }}
    </p>

    <div class="d-flex justify-content-around py-5">
      <NewRecipeCamera />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewRecipeCamera from '@/components/recipe/NewRecipeCamera.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<i18n>
{
  "de": {
    "welcome": "Einfach ein Bild von deinen Zutaten machen, um ein Rezept zu erstellen!"
  },
  "en": {
    "welcome": "Just take a picture of your ingredients to get a recipe!"
  }
}
</i18n>
