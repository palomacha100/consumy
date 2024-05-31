<template>
  <div class="global-container" :style="{ width, height, backgroundColor }"><slot></slot></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const { width, height, backgroundColor } = defineProps({
  width: String,
  height: String,
  backgroundColor: String
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 15px;;
  justify-content: center;
}
</style>
