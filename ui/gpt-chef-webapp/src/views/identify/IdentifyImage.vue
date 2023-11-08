<template>
  <div class="container">
    <div
      class="d-flex align-items-center justify-content-around image-selection"
    >
      <ImageDataUrlLoader @change="setImageDataUrl" />
    </div>

    <div v-if="imageDataUrl">
      <Cropper
        v-if="imageDataUrl"
        ref="cropper"
        :src="imageDataUrl"
        :stencil-props="{ aspectRatio: 12 / 12 }"
        class="cropper mb-3"
      />

      <button
        v-if="showIdentifyButton"
        @click="sendCroppedImage"
        class="btn btn-secondary btn-lg btn-block"
      >
        Identifizieren
      </button>

      <div v-else-if="isFetching" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <div v-if="responseText" class="mt-3">
        <p>{{ responseText }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SUGGEST_RECIPE_URL } from "@/urls";
import api from "@/service/api";

import { Cropper } from "vue-advanced-cropper";
import ImageDataUrlLoader from "@/components/input/ImageDataUrlLoader.vue";

import "vue-advanced-cropper/dist/style.css";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Cropper,
    ImageDataUrlLoader,
  },
  data() {
    return {
      imageDataUrl: null,
      isFetching: false,
      showIdentifyButton: false,
      responseText: null,
    };
  },
  methods: {
    sendCroppedImage: async function () {
      // const audio = new Audio()
      // audio.crossOrigin = 'anonymous'

      // this.showIdentifyButton = false
      // this.isFetching = true

      // const { canvas } = this.$refs.cropper.getResult();
      // const croppedImageDataUrl = canvas.toDataURL('image/jpeg')

      // const data = { image_data_url: croppedImageDataUrl }

      const { text } = await api.post(SUGGEST_RECIPE_URL);
      console.log(text);

      // this.isFetching = false
      // this.responseText = text

      // audio.src = url
      // audio.play()
    },
    setImageDataUrl: function (imageDataUrl: string) {
      this.showIdentifyButton = true;
      this.responseText = null;
      this.imageDataUrl = imageDataUrl as any;
    },
  },
});
</script>

<style scoped>
.image-selection {
  height: 120px;
}

:deep(.vue-advanced-cropper__background),
:deep(.vue-advanced-cropper__cropper-wrapper),
:deep(.vue-advanced-cropper__foreground),
:deep(.vue-advanced-cropper__image-wrapper) {
  border-radius: 0.25rem !important;
}
</style>
