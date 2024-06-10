<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cartState } from '@/api/cartService';
import { OrderService } from '@/api/orderService';
import TitleStyled from './TitleStyled.vue';
import TextStyled from './TextStyled.vue';
import ButtonStyled from './ButtonStyled.vue';
import Swal from 'sweetalert2';

const cart = cartState.cart;
const order = new OrderService();
const router = useRouter();

const fullName = ref('');
const address = ref('');
const numberAddress = ref('');
const complementAddress = ref('');
const neighborhood = ref('');
const city = ref('');
const state = ref('');
const cep = ref('');


const cardNumber = ref('');
const cardName = ref('');
const expirationData = ref('');
const cvv = ref('');
const validCart = ref('');

onMounted(() => {
  fullName.value = localStorage.getItem('fullName') || '';
  address.value = localStorage.getItem('address') || '';
  numberAddress.value = localStorage.getItem('numberAddress') || '';
  complementAddress.value = localStorage.getItem('complementAddress') || '';
  neighborhood.value = localStorage.getItem('neighborhood') || '';
  city.value = localStorage.getItem('city') || '';
  state.value = localStorage.getItem('state') || '';
  cep.value = localStorage.getItem('cep') || '';
});

const fullAddress = computed(() => {
  return `${address.value}, ${numberAddress.value} ${complementAddress.value}, ${neighborhood.value}, ${city.value} - ${state.value}, CEP: ${cep.value}`;
});

const totalCartPrice = computed(() => {
  return cart.reduce((total, product) => {
    const price = parseFloat(product.price.replace('R$', '').replace(/\./g, '').replace(',', '.'));
    return total + (price * product.quantity);
  }, 0);
});

const totalCartPriceFormatted = computed(() => {
  return totalCartPrice.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

const calculateTax = computed(() => {
  return totalCartPrice.value * 0.02;
});

const calculateTaxFormatted = computed(() => {
  return calculateTax.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

const finalCartPriceFormatted = computed(() => {
  const finalPrice = totalCartPrice.value + calculateTax.value;
  return finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

const placeOrder = () => {
  const orderItem = {
    order: {
      store_id: cart[0].store_id,
      order_items_attributes: cart.map(product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    }
  }
  const paymentData = {
    payment: {
      number: cardNumber.value,
      cvv: cvv.value,
      value: finalCartPriceFormatted.value,
      valid: expirationData.value
    }
  }
  order.createOrder(orderItem, paymentData, () => {
    Swal.fire({
      title: 'Pedido realizado com sucesso!',
      text: 'Seu pedido foi realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }, () => {
    console.error('Failed to place order');
  });
};

</script>

<template>
  <div class="checkout-container">
    <TitleStyled className="title-styled" title="Fechar pedido"/>
    
    <section class="delivery-address">
      <div class="delivery-title">
        <TitleStyled className="medium-title" title="Endereço de entrega"/>
      </div>
      <div class="delivery-address-info">
        <TextStyled className="gray-text" height="1.5rem" :text="fullName"/>
        <TextStyled className="gray-text" height="1.5rem" :text="`${address}, ${numberAddress} ${complementAddress}`"/>
        <TextStyled className="gray-text" height="1.5rem" :text="neighborhood"/>
        <TextStyled className="gray-text" height="1.5rem" :text="`${city}, ${state}, ${cep}`"/>
      </div>
    </section>

    <section class="payment-method">
      <div class="payment-title">
        <TitleStyled className="medium-title" title="Método de pagamento"/>
      </div>
      <div class="payment-options">
        <label>
          Número do cartão
          <input type="text" v-model="cardNumber" />
        </label>
        <label>
          Nome no cartão
          <input type="text" v-model="cardName" />
        </label>
        <label>
          Data de Expiração
          <input type="data" v-model="expirationData" placeholder="YYYY-MM-DD"/>
        </label>
        <label>
          Código de segurança (CVV)
          <input type="text" v-model="cvv" placeholder="XXX" maxlength="3"/>
        </label>
      </div>
    </section>

    <section class="order-review">
      <TitleStyled className="medium-title" title="Revisão do pedido"/>
      <div class="order-item" v-for="product in cart" :key="product.id">
        <img :src="product.image_url" alt="Product Image" class="order-thumbnail" />
        <div class="order-details">
          <h3>{{ product.title }}</h3>
          <p>Quantidade: {{ product.quantity }}</p>
          <p>Preço: {{ product.price }}</p>
        </div>
      </div>
    </section>
    <div class="order-summary">
      <p>Subtotal: {{ totalCartPriceFormatted }}</p>
      <p>Taxa: {{ calculateTaxFormatted }}</p>
      <h3>Total: {{ finalCartPriceFormatted }}</h3>
    </div>
    <div class="button-container">
      <ButtonStyled className="login-button" @click="placeOrder" label="Finalizar pedido" class="login-button"
        width="12rem"
        height="2.8rem"/>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  width: 68.75rem;
  margin: 30px auto;
  height: auto;
  display: flex;
  flex-direction: column;
}

.delivery-address {
  margin: 1rem 0 0 0;
  display: flex;
  height: 110px;
  border-bottom: 1px solid #ddd;
}

.payment-method {
  margin: 1rem 0 0 0;
  display: flex;
  height: 150px;
}

.order-review {
  margin: 1rem 0 0 0;
  min-height: 150px;
}

.payment-method {
  border-bottom: 1px solid #ddd;
}

.order-review {
  flex-direction: column;
}

.delivery-address-info, .payment-options {
  display: flex;
  flex-direction: column;
  margin: 5px;
  height: 100px;
}

.payment-title, .delivery-title {
  width: 300px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label, input {
  color: var(--dark-gray);
  font-size: 0.875rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0 0 0;
  height: 150px;
}

.order-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.order-details {
  flex-grow: 1;
}

.order-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  margin-top: 1rem;
  height: 100px;
}

.button-container {
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
</style>


  