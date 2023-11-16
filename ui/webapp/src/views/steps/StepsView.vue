<template>
  <div>
    <h2>{{ stepIndex + 1 }}</h2>

    <p>{{ step.description }}</p>

    <button @click="stepIndex - 1 >= 0 ? stepIndex-- : 0">Zurück</button>
    <button @click="stepIndex + 1 < recipe.steps.length ? stepIndex++ : 0">
      Weiter
    </button>
  </div>
</template>

<script lang="ts">
import { recipeStore } from "@/stores/recipeStore";

import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      stepIndex: 0,
    };
  },
  computed: {
    recipe: function () {
      return recipeStore.recipe;
    },
    step: function (): string {
      return recipeStore.recipe.steps[this.stepIndex];
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
