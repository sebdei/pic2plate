<template>
  <div class="wrapper pb-5 d-flex flex-column vh-100">
    <div class="image">
      <img src="/img/champignon.jpg" class="image-top w-100" />
    </div>

    <div class="mt-5 ms-5 me-5">
      <h2 class="name">
        {{ recipe!.name }}
      </h2>
    </div>

    <div class="mt-5 ms-5 me-5">
      <div class="mt-3 ingredients">
        <h3>Zutaten</h3>

        <ul class="mt-4">
          <li
            class="ingredient pb-1"
            v-for="ingredient in recipe!.ingredients"
            :key="ingredient.name"
          >
            {{ ingredient.amount }} {{ ingredient.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="d-flex mt-auto justify-content-center">
      <button type="button" class="btn btn-primary btn-lg w-75">
        Let's go!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { recipeStore } from "@/stores/recipeStore";

import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    image: String,
  },
  data() {
    return {};
  },
  computed: {
    recipe: function () {
      return recipeStore.recipe;
    },
  },
  methods: {
    setImageDataUrl: function () {
      //
    },
  },
});
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
