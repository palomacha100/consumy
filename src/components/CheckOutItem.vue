<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cartState } from '@/api/cartService';
import TitleStyled from './TitleStyled.vue';
import TextStyled from './TextStyled.vue';

const cart = cartState.cart;
const router = useRouter();

const fullName = ref('');
const address = ref('');
const numberAddress = ref('');
const complementAddress = ref('');
const neighborhood = ref('');
const city = ref('');
const state = ref('');
const cep = ref('');

const paymentMethod = ref('');
const cardNumber = ref('');
const cardName = ref('');
const expirationMonth = ref('');
const expirationYear = ref('');
const cvv = ref('');

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
  if (fullAddress.value && paymentMethod.value) {
    if (paymentMethod.value === 'credit' && (!expirationMonth.value || !expirationYear.value)) {
      alert('Por favor, preencha a data de expiração do cartão de crédito');
      return;
    }
    
    console.log('Pedido finalizado com sucesso!', {
      address: fullAddress.value,
      paymentMethod: paymentMethod.value,
      cardNumber: cardNumber.value,
      cardName: cardName.value,
      expirationMonth: expirationMonth.value,
      expirationYear: expirationYear.value,
      cvv: cvv.value,
      cart: cart,
      total: finalCartPriceFormatted.value
    });
    router.push('/order-success'); 
  } else {
    alert('Por favor, preencha todos os campos');
  }
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
          Mês de Expiração
          <input type="text" v-model="expirationMonth" placeholder="MM" maxlength="2"/>
        </label>
        <label>
          Ano de Expiração
          <input type="text" v-model="expirationYear" placeholder="AAAA" maxlength="4"/>
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

    <button @click="placeOrder">Finalizar Pedido</button>
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
  margin: 1rem 0;
  display: flex;
  height: 110px;
}

.payment-method, .order-review  {
    margin: 1rem 0;
  display: flex;
  height: 130px;
}

.order-review {
    flex-direction: column;
}

.delivery-address-info, .payment-options{
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
  padding: 1rem 0;
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

button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

  