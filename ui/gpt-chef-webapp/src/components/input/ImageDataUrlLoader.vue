<template>
  <div>
    <label for="file-upload" class="custom-file-upload">
      <span class="material-icons md-48"> photo_camera </span>
    </label>

    <input
      accept="image/*"
      id="file-upload"
      type="file"
      @change="uploadImage"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["change"],
  methods: {
    uploadImage: function (e) {
      const image = e.target.files[0];

      if (image) {
        const reader = new FileReader();

        reader.readAsDataURL(image);
        reader.onload = e => {
          const imageDataUrl = e.target.result;
          this.$emit("change", imageDataUrl);
        };
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
