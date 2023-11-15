<template>
  <div class="container" v-if="!recipe">
    <div
      class="d-flex align-items-center justify-content-around image-selection"
    >
      <ImageDataUrlLoader @change="setImageDataUrl" />
    </div>

    <div v-if="imageDataUrl !== ''">
      <div class="image">
        <img :src="imageDataUrl" class="mb-3 mw-100" />
      </div>

      <button
        v-if="showIdentifyButton"
        @click="sendImage"
        class="btn btn-secondary btn-lg btn-block"
      >
        Gimme your recipe!!
      </button>

      <div v-else-if="isFetching" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <div v-if="responseText" class="mt-3">
        <pre>{{ responseText }}</pre>
      </div>
    </div>
  </div>

  <div v-if="recipe">
    <RecipeView :recipe="recipe" :image="imageDataUrl"></RecipeView>
  </div>
</template>

<script lang="ts">
import * as api from "@/service/api";
import { SUGGEST_RECIPE_URL } from "@/urls";

import ImageDataUrlLoader from "@/components/input/ImageDataUrlLoader.vue";
import RecipeView from "@/views/recipe/RecipeView.vue";

import { defineComponent } from "vue";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  components: {
    ImageDataUrlLoader,
    RecipeView,
  },
  data() {
    return {
      imageDataUrl: "",
      isFetching: false,
      showIdentifyButton: false,
      recipe: undefined,
      responseText: null,
      gotData: false,
    };
  },
  methods: {
    sendImage: async function () {
      this.showIdentifyButton = false;
      this.isFetching = true;

      const data = { image_data_url: this.imageDataUrl };
      const { error, ...recipe } = await api.post(SUGGEST_RECIPE_URL, data);

      if (error) {
        console.log("error");
      } else {
        console.log(recipe);
        this.isFetching = false;
        this.recipe = recipe;
      }
    },
    setImageDataUrl: function (imageDataUrl: string) {
      this.showIdentifyButton = true;
      this.responseText = null;
      this.imageDataUrl = imageDataUrl;
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
