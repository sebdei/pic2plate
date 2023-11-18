import ImageDataUrlLoader from '@/components/input/ImageDataUrlLoader.vue';
<template>
  <div>
    <label for="file-upload" class="custom-file-upload">
      <span class="material-icons md-64"> photo_camera </span>
    </label>

    <input accept="image/*" id="file-upload" type="file" @change="loadImage" />

    <canvas v-if="props.maxHeight" class="d-none" ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  maxHeight: Number
})

const emits = defineEmits(['change'])

const canvasRef = ref<InstanceType<typeof HTMLCanvasElement>>()

function loadImage(e: Event) {
  const image = (e.target as HTMLInputElement)?.files?.[0]

  if (image) {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = async (e) => {
      const imageDataUrl = e.target?.result as string
      const effectiveImageDataUrl =
        imageDataUrl && props.maxHeight ? await resize(imageDataUrl) : imageDataUrl

      emits('change', effectiveImageDataUrl)
    }
  }
}

async function getImgElement(imageDataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }

    img.onerror = reject
    img.src = imageDataUrl
  })
}

async function resize(imageDataUrlLoader: string) {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')

  if (!canvas || !ctx || !props.maxHeight) return

  const img = await getImgElement(imageDataUrlLoader)
  ctx.drawImage(img, 0, 0)

  const isPortrait = img.height > img.width
  const isTooBig = isPortrait ? img.height > props.maxHeight : img.width > props.maxHeight

  if (isTooBig && isPortrait) {
    const ratio = props.maxHeight / img.height
    canvas.height = props.maxHeight
    canvas.width = img.width * ratio
  } else if (isTooBig && !isPortrait) {
    const ratio = props.maxHeight / img.width
    canvas.height = img.height * ratio
    canvas.width = props.maxHeight
  } else {
    canvas.height = img.height
    canvas.width = img.width
  }

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/jpeg')
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}
</style>
