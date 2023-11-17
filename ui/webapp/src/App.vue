<template>
  <div>
    <main class="min-vh-100">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
header html,
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
