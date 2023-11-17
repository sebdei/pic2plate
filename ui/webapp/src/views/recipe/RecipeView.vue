<template>
  <div class="wrapper pb-5 d-flex flex-column vh-100">
    <div class="image">
      <img src="/img/champignon.jpg" class="image-top w-100" />
    </div>

    <div class="mt-5 ms-5 me-5">
      <h2 class="name">
        {{ recipeStore.recipe!.name }}
      </h2>
    </div>

    <div class="mt-5 ms-5 me-5">
      <div class="mt-3 ingredients">
        <h3>Zutaten</h3>

        <ul class="mt-4">
          <li
            class="ingredient pb-1"
            v-for="ingredient in recipeStore.recipe!.ingredients"
            :key="ingredient.name"
          >
            {{ ingredient.amount }} {{ ingredient.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="d-flex mt-auto justify-content-center">
      <RouterLink :to="{ name: 'StepsView' }">
        <button type="button" class="btn btn-success btn-lg w-75">Let's go!</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { recipeStore } from '@/stores/recipeStore'
</script>

<style scoped>
.wrapper {
  background-color: #eeeeee05;
}

.image {
  height: 35%;
  overflow: hidden;
}

.image-top {
  min-height: 35%;
}

.name {
  font-size: 2.5rem;
}

.ingredients ul {
  padding-left: 1rem;
}

button {
  font-size: 1.75rem;
}
</style>
