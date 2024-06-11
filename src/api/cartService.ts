import { reactive, computed, watch } from 'vue';

export interface Product {
  id: number;
  title: string;
  category: string;
  image_url: string;
  thumbnail_url: string;
  price: string;
  quantity: number;
  store_id: number;
}

interface CartState {
  cart: Product[];
  totalItemsInCart?: number;
}

const loadCartFromLocalStorage = (): Product[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartState = reactive<CartState>({
  cart: loadCartFromLocalStorage(),
});

export const totalItemsInCart = computed(() => {
  return cartState.cart.reduce((total, item) => total + item.quantity, 0);
});

export const addToCart = (product: Product) => {
  const existingProduct = cartState.cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cartState.cart.push({ ...product });
  }
  saveCartToLocalStorage(cartState.cart);
};

watch(() => cartState.cart, (newCart) => {
  saveCartToLocalStorage(newCart);
}, { deep: true });




