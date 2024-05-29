<script lang="ts">
import { defineComponent } from 'vue'
import ImageStyled from './ImageStyled.vue'
import ButtonStyled from './ButtonStyled.vue'
import TextStyled from './TextStyled.vue'

export default defineComponent({
  components: {
    ImageStyled,
    ButtonStyled,
    TextStyled
  }
})
</script>
<template>
  <div class="main-container">
    <div class="header-container">
      <ImageStyled
        imageUrl="../../images/logo.png"
        altText="Logo com nome do app Link to Food em azul"
        width="7.5rem"
      />
      <nav>
        <RouterLink :to="{ name: 'signIn' }">
          <ButtonStyled className="login-button" label="Começar" width="9.75rem" height="3rem" />
        </RouterLink>
      </nav>
    </div>
    <TextStyled
      text="Conecte sua loja a milhões de novos clientes"
      className="main-text"
      width="50rem"
      height="2.8rem"
    />
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: url('../../images/fast-food.jpg');
  opacity: 0.9;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}

.main-container > div:nth-child(2) {
  margin: auto;
}

.header-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 5.7rem;
  padding: 0 24px;
  background-color: var(--white);
}
</style>
