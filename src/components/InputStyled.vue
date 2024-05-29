<script setup lang="ts">
import { defineProps, type PropType } from 'vue'

const { id, placeholder, borderColor, width, height, label, error, handleChange } = defineProps({
  type: String,
  id: String,
  placeholder: String,
  borderColor: String,
  width: String,
  height: String,
  label: String,
  password: String,
  error: String,
  handleChange: {
    type: Function as PropType<(event: Event) => void>,
    default: undefined
  },
  disabled: Boolean
})

const model = defineModel<string | boolean | number>()
</script>

<template>
  <div class="input-container">
    <div
      v-if="type === 'radio' || type === 'checkbox'"
      class="radio-container"
      :style="{ width, height, borderColor }"
    >
      <label :for="id">
        <input :id="id" :type="type" v-model="model" />
        {{ label }}
      </label>
    </div>

    <input
      v-else
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :style="{ width, height, borderColor }"
      v-model="model"
      @input="handleChange"
      :disabled="disabled"
    />
    <span>{{ error }}</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
input {
  padding: 4px 10px;
  font-size: 0.875rem;
  font-family: 'Poppins';
  background-color: var(--white);
  border-radius: 5px;
  margin: 5px 0;
  color: var(--dark-gray);
  box-shadow: 0 0 1px 0 var(--dark-gray);
}

input::placeholder {
  color: var(--dark-gray);
  font-family: 'Poppins';
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

label {
  font-size: 0.875rem;
  color: var(--dark-gray);
}

span {
  color: var(--red);
  font-size: 0.75rem;
}

.input-container {
  height: 5rem;
}

.custom-height {
  height: 3rem;
}

.radio-container {
  display: flex;
  flex-direction: row;
}
</style>
