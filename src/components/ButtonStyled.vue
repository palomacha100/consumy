<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  label: string
  className: string
  isDisabled?: boolean
  width?: string
  height?: string
}>()

const emit = defineEmits(['click'])

function handleClick(event: MouseEvent) {
  if (!props.isDisabled) {
    emit('click', event)
  }
}
</script>
<template>
  <button :class="className" :style="{ width, height }" :disabled="isDisabled" @click="handleClick">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  font-family: 'Poppins';
  font-weight: 700;
}

.login-button {
  background-color: var(--red);
  color: white;
  border: none;
}

.login-button:hover {
  background-color: var(--red);
  opacity: 0.8;
}

.transparent-button-red-text {
  background-color: transparent;
  color: var(--red);
  border: none;
  width: auto;
  height: 2.8rem;
  text-align: start;
}

.disable-button {
  background-color: var(--light_blue);
  color: var(--white);
  cursor: not-allowed;
  border: none;
}

.red-button {
  background-color: transparent;
  border-width: 2px;
  border-color: var(--red);
  color: var(--red);
  border-style: solid;
}
</style>
