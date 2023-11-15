<template>
  <div>
    <label for="file-upload" class="custom-file-upload">
      <span class="material-icons md-64"> photo_camera </span>
    </label>

    <input
      accept="image/*"
      id="file-upload"
      type="file"
      @change="uploadImage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["change"],
  methods: {
    uploadImage: function (e: Event) {
      const image = (e.target as HTMLInputElement)?.files?.[0];

      if (image) {
        const reader = new FileReader();

        reader.readAsDataURL(image);
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result;
          this.$emit("change", imageDataUrl);
        };
      }
    },
  },
});
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
