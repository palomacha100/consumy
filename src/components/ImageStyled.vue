<script setup lang="ts">
import InputStyled from './InputStyled.vue'

defineProps<{
  imageUrl: string
  altText?: string
  width?: string
  height?: string
  permitedUpload?: boolean
}>()
</script>

<template>
  <div>
    <img :src="imageUrl" :alt="altText" :style="{ width, height }" v-if="!permitedUpload" />
    <InputStyled
      v-if="permitedUpload"
      type="file"
      id="imageUrl"
      width="20rem"
      height="10rem"
      borderColor="transparent"
      v-bind:permitedUpload="true"
    />
  </div>
</template>
