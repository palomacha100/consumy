<script lang="ts">
import { defineComponent } from 'vue'
import ImageStyled from './ImageStyled.vue'

export default defineComponent({
  components: {
    ImageStyled
  }
})
</script>
<template>
  <div class="main-container">
    <div class="image-container"></div>

    <div class="form-container">
      <ImageStyled
        imageUrl="../../images/logo.png"
        altText="Logo com nome do app Link to Food"
        width="9.375rem"
      />

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  height: 100vh;
  width: 50%;
  background-image: url('../../images/fast-food.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  opacity: 0.9;
  align-items: center;
}

.form-container {
  padding: 20px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  height: 33rem;
  background-color: rgba(237, 228, 161, 0.5);
  border-radius: 5px;
  margin: auto;
  justify-content: center;
  gap: 4px;
}

.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
