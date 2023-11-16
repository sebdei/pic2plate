<template>
  <div class="container-fluid">
    <img :src="imageUrl" class="mw-100 mb-4" />

    <div v-if="!isFetching" class="d-flex justify-content-between">
      <span class="material-icons md-64" @click="submitImage"> replay </span>
      <ImageDataUrlLoader @change="setAndSubmit" />
    </div>

    <LoadingIndicator v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    };
  },
  computed: {
    imageUrl: function () {
      return recipeStore.imageUrl;
    },
  },
  methods: {
    setAndSubmit: function (imageDataUrl: string) {
      this.imageDataUrl = imageDataUrl;
    },
    submitImage: async function () {
      this.isFetching = true;

      const data = { image_data_url: this.imageDataUrl };
      const { error, ...recipe } = await api.post(SUGGEST_RECIPE_URL, data);

      if (error) {
        console.log("error");
      } else {
        console.log(recipe);
        recipeStore.recipe = recipe;
        this.$router.push({ name: "RecipeView" });
      }
    },
  },
});
</script>
