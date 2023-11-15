<template>
  <div class="container">
    <img src="/img/pic2plate.png" class="mw-100 mb-4" />

    <h3 class="mb-5">
      {{ $t("welcome") }}
    </h3>

    <div
      class="d-flex align-items-center justify-content-around image-selection"
    >
      <ImageDataUrlLoader v-if="!isFetching" @change="submitImage" />
      <LoadingIndicator v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "vue-advanced-cropper/dist/style.css";

import * as api from "@/service/api";
import { SUGGEST_RECIPE_URL } from "@/urls";
import { recipeStore } from "@/stores/recipeStore";

import ImageDataUrlLoader from "@/components/input/ImageDataUrlLoader.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

export default defineComponent({
  components: {
    ImageDataUrlLoader,
    LoadingIndicator,
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
    submitImage: async function (imageDataUrl: string) {
      recipeStore.imageUrl = imageDataUrl;

      this.isFetching = true;

      const data = { image_data_url: imageDataUrl };
      const { error, ...recipe } = await api.post(SUGGEST_RECIPE_URL, data);

      if (error) {
        this.$router.push({ name: "ErrorView" });
      } else {
        recipeStore.recipe = recipe;
        this.$router.push({ name: "RecipeView" });
      }
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
