<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  title: string
  className: string
}>()
</script>

<template>
  <div :class="className">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.title-styled {
  width: 100%;
  display: flex;
  align-items: center;          
}
.title-styled h1 {
  color: var(--red);
  font-size: 2rem;
}

.small-title {
  color: var(--dark-gray);
  font-size: 10px;
}
</style>
