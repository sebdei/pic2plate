<template>
  <div class="image">
    <img :src="image" class="mb-3 mw-100" />
  </div>
  <div class="ingredients">
    {{ recipe }}
  </div>
</template>

<script lang="ts">
import * as api from "@/service/api";
import { SUGGEST_RECIPE_URL } from "@/urls";
import { computed } from "vue";

import { recipeStore } from "@/stores/recipeStore";

import { defineComponent } from "vue";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  components: {},
  props: {
    image: String,
  },
  data() {
    return {};
  },
  computed: {
    recipe: computed(() => recipeStore.recipe),
  },
  methods: {
    setImageDataUrl: function () {
      //
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
</style>
