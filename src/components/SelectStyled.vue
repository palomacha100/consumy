<template>
  <div class="select-container" :style="{ width, height }">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="selectedValue" @change="handleChange">
      <option value="" disabled hidden>{{ typeOfSelect }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { type PropType } from 'vue'

const { id, options, width, height, handleChange } = defineProps({
  id: {
    type: String,
    default: ''
  },
  options: Array as () => Option[],
  width: String,
  height: String,
  label: String,
  typeOfSelect: String,
  value: String,
  handleChange: {
    type: Function as PropType<(event: Event) => void>,
    default: undefined
  }
})

interface Option {
  value: string
  label: string
}

const selectedValue = ref<string>('')
</script>

<style scoped>
div {
  height: 5rem;
}

label {
  font-family: 'Poppins';
}

option {
  font-family: 'Poppins';
}

select {
  font-family: 'Poppins';
  width: 100%;
  height: 2.8rem;
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 0.875rem;
  background-color: var(--white);
  margin: 5px 0;
  color: var(--dark-gray);
  border-color: transparent;
  box-shadow: 0 0 1px 0 var(--dark-gray);
}
</style>
