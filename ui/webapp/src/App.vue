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
  font-family: 'Poppins-Light', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #516172;
  /* color: #6a7b8d; */
  font-size: 18px;
}

button {
  font-family: 'Poppins-Medium', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Poppins-Bold', sans-serif;
}
</style>
