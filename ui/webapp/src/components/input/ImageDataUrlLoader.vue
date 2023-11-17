<template>
  <div>
    <label for="file-upload" class="custom-file-upload">
      <span class="material-icons md-64"> photo_camera </span>
    </label>

    <input accept="image/*" id="file-upload" type="file" @change="loadImage" />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['change'])

const loadImage = (e: Event) => {
  const image = (e.target as HTMLInputElement)?.files?.[0]

  if (image) {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result
      emits('change', imageDataUrl)
    }
  }
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}
</style>
