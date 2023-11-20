<template>
  <div class="container-fluid text-center">
    <img src="/img/pic2plate.png" class="mw-100 mb-4 p-5" />

    <p class="mb-5 fs-2">
      {{ t('welcome') }}
    </p>

    <div class="d-flex align-items-center justify-content-around image-selection">
      <NewRecipeCamera />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewRecipeCamera from '@/components/recipe/NewRecipeCamera.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.image-selection {
  height: 120px;
}

.image img {
  height: 300px;
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
