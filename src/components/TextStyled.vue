<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  text: string
  width?: string
  height?: string
  className: string
}>()
</script>

<template>
  <div :class="className" :style="{ width, height }">
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: start;
  align-items: center;
}
.text-container {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
.gray-text p {
  color: var(--dark-gray);
  font-size: 0.875rem;
  height: 2rem;
}
.red-text p {
  color: var(--red);
  font-size: 0.875rem;
}
.white-bold-text p {
  color: var(--white);
  font-weight: 700;
}
.white-small-text p {
  color: var(--white);
  font-size: 0.875rem;
}
.red-bold-text p {
  color: var(--red);
  font-weight: 700;
}
.gray-bold-text p {
  color: var(--dark-gray);
  font-weight: 700;
  font-size: 0.875rem;
}

.big-text {
  font-size: 2rem;
  color: var(--dark-gray);
  font-weight: 700;
}

.subtitle {
  color: var(--dark-gray);
  font-size: 1rem;
  font-weight: 700;

}

@media (max-width: 768px) {
  .gray-text p {
    font-size: 0.875rem;
  }
}
</style>
