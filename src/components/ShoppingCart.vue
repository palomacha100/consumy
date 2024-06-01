<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { cartState } from '@/api/cartService';
  import { computed } from 'vue';
  import TitleStyled from './TitleStyled.vue';
  import TextStyled from './TextStyled.vue';
  import ButtonStyled from './ButtonStyled.vue';
  import InputStyled from './InputStyled.vue';
  
  const cart = cartState.cart;
  const router = useRouter();
  
  const goBackToShopping = () => {
    router.push('/listingProducts');
  };
  
  const increaseQuantity = (product: any) => {
    product.quantity += 1;
  };
  
  const decreaseQuantity = (product: any) => {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  };
  
  const removeFromCart = (product: any) => {
    const index = cart.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
  };
  
  const proceedToPayment = () => {
    router.push('/payment');
  };
  
  const totalCartPrice = computed(() => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price.replace('R$', '').replace(/\./g, '').replace(',', '.'));
      return total + (price * product.quantity);
    }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  });
  </script>

<template>
    <div class="cart-container">
      <TitleStyled className="title-styled" title="Meu carrinho"/>
      <div v-if="cart.length === 0" class="empty-cart">
        <TextStyled
          className="big-text" 
          width=" auto"
          height="2.5rem"
          text="Seu carrinho de compras está vazio"/>
        <ButtonStyled @click="goBackToShopping" 
          label="Voltar para as compras"
          className="transparent-button-red-text "
          width="10rem"
          height="2.5rem"/>
      </div>
      <div v-else>
        <div class="cart-items">
          <div class="cart-item" v-for="product in cart" :key="product.id">
            <img :src="product.image_url" alt="Product Image" class="cart-thumbnail" />
            <div class="cart-details">
              <TitleStyled :title="product.title" className="small-title"/>
              <p>{{ product.category }}</p>
              <p class="price">{{ product.price }}</p>
              <div class="quantity-container">
                <ButtonStyled 
                  @click="decreaseQuantity(product)"
                  className="transparent-button-red-text"
                  label="-"
                  width="1rem"
                  height="2.8rem"
                />
                <InputStyled 
                  type="number" 
                  v-model.number="product.quantity" min="0"
                  width="2rem"
                  height="2rem"
                  class="custom-height"
                  borderColor="transparent"
                />
                <ButtonStyled 
                  @click="increaseQuantity(product)"
                  className="transparent-button-red-text"
                  label="+"
                  width="1rem"
                  height="2.8rem"
                />
              </div>
              <ButtonStyled 
                @click="removeFromCart(product)"
                className="login-button"
                label="Remover"
                width="5rem"
                height="2rem"
                />
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Total: {{ totalCartPrice }}</h2>
          <button @click="proceedToPayment">Ir para pagamento</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .cart-container {
    width: 80%;
    margin: auto;
  }
  
  .empty-cart {
    text-align: center;
    margin-top: 50px;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .cart-item {
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
  }
  
  .cart-thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  
  .cart-details {
    flex-grow: 1;
  }
  
  .price {
    font-weight: bold;
    color: #333;
  }
  
  .quantity-container{
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .quantity-controls button {
    width: 2rem;
    height: 2rem;
  }
  
  .cart-summary {
    margin-top: 2rem;
    text-align: right;
  }
  </style>
  