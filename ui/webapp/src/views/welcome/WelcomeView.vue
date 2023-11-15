<template>
  <div class="container">
    <img src="./pic2plate.png" class="mw-100" />

    <h3>
      {{ $t("welcome") }}
    </h3>

    <div
      class="d-flex align-items-center justify-content-around image-selection"
    >
      <div v-if="isFetching" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <ImageDataUrlLoader v-else @change="submit" />
    </div>
  </div>
</template>

<script lang="ts">
import * as api from "@/service/api";
import { SUGGEST_RECIPE_URL } from "@/urls";
import { recipeStore } from "@/store/recipeStore";

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
    };
  },
  methods: {
    submit: async function (imageDataUrl: string) {
      this.isFetching = true;

      const data = { image_data_url: imageDataUrl };
      const { error, ...recipe } = await api.post(SUGGEST_RECIPE_URL, data);

      if (error) {
        console.log("error");
      } else {
        console.log(recipe);
        recipeStore.recipe = recipe;

        this.$router.push();
      }
    },
  },
  i18n: {
    messages: {
      de: {
        welcome:
          "Einfach ein Bild von deinem Essen machen und wir sagen dir das Rezept!",
      },
      en: {
        welcome:
          "Just take a picture of your food and we will tell you the recipe!",
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
