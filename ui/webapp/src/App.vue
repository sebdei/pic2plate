<template>
  <div>
    <main class="min-vh-100">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: Helvetica, Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6a7b8d;
  font-size: 18px;
}
</style>
