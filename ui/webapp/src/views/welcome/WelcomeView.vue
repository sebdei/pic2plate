<template>
  <div class="container">
    <img src="/img/pic2plate.png" class="mw-100 mb-4" />

    <h3 class="mb-5">
      {{ $t("welcome") }}
    </h3>

    <div
      class="d-flex align-items-center justify-content-around image-selection"
    >
      <div v-if="isFetching" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <ImageDataUrlLoader v-else @change="submit" />
    </div>
  </div>
</template>

<script lang="ts">
import * as api from "@/service/api";
import { SUGGEST_RECIPE_URL } from "@/urls";

import { recipeStore } from "@/stores/recipeStore";
import ImageDataUrlLoader from "@/components/input/ImageDataUrlLoader.vue";

import { defineComponent } from "vue";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  components: {
    ImageDataUrlLoader,
  },
  data() {
    return {
      imageDataUrl: "",
      isFetching: false,
      recipe: undefined,
      responseText: null,
      gotData: false,
    };
  },
  methods: {
    submit: async function (imageDataUrl: string) {
      this.$router.push({ name: "RecipeView" });

      return;
      // this.isFetching = true;

      // const data = { image_data_url: imageDataUrl };
      // const { error, ...recipe } = await api.post(SUGGEST_RECIPE_URL, data);

      // if (error) {
      //   console.log("error");
      // } else {
      //   console.log(recipe);
      //   recipeStore.recipe = recipe;
      //   this.$router.push({ name: "RecipeView" });
      // }
    },
  },
  i18n: {
    messages: {
      de: {
        welcome:
          "Einfach ein Bild von deinem Essen machen, um dein Rezept zu erstellen!",
      },
      en: {
        welcome: "Just take a picture of your food to get your recipe!",
      },
    },
  },
});
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
