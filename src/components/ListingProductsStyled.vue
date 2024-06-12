<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { ProductService } from '@/api/productService'
  import { StoreService } from '@/api/storeService'
  import TitleStyled from './TitleStyled.vue'
  import InputStyled from './InputStyled.vue'
  import ContainerStyled from './ContainerStyled.vue'
  import { useRoute } from 'vue-router'
  import ButtonStyled from './ButtonStyled.vue'
  import { addToCart } from '@/api/cartService';

  const route = useRoute()
  const filteredProducts = ref<any[]>([])
  const productService = new ProductService()
  const storeService = new StoreService()
  const products = ref<Product[]>([])
  const searchQuery = ref<string>('')
  const sortOrderName = ref<'asc' | 'desc'>('asc')
  const sortOrderPrice = ref<'asc' | 'desc'>('asc')
  const storeName = ref<string>('')


  interface Product {
  id: number
  title: string
  category: string
  image_url: string
  price: string
  active: boolean
  quantity: number
  thumbnail_url: string
  store_id: number
}

const fetchProducts = async (storeId: number) => {
  if (!storeId) {
    return
  }
  await productService.getProducts(
    storeId,
    (data: any) => {
      products.value = data.result.products || []
      console.log(data)
      if (products.value.length > 0) {
        products.value.forEach((product) => {
          product.active = true
          product.quantity = 0
        })
      }
      const newProduct = products.value.map((product) => ({
        ...product,
        image_url: `${import.meta.env.VITE_APP_API_URL}${product.image_url}`,
        thumbnail_url: `${import.meta.env.VITE_APP_API_URL}${product.thumbnail_url}`
      }))
      console.log(newProduct)
      filteredProducts.value = newProduct
    },
    () => {
      console.error('Failed to fetch products')
    }
  )
}

const fetchStoreName = async (storeId: number) => {
  console.log('nome da loja')
    if (!storeId) {
      return
    }
    await storeService.getStoresById(storeId, // Certifique-se de que estamos chamando o método correto
      response => {
        storeName.value = response.name
      },
      () => {
        console.error('Failed to fetch store')
      })
  }

const sortByName = () => {
  if (sortOrderName.value === 'asc') {
    filteredProducts.value.sort((a, b) => a.title.localeCompare(b.title))
    sortOrderName.value = 'desc'
  } else {
    filteredProducts.value.sort((a, b) => b.title.localeCompare(a.title))
    sortOrderName.value = 'asc'
  }
}

const parsePrice = (price: string) => {
  return parseFloat(price.replace("R$", "").replace(/\./g, "").replace(",", "."))
}

const sortByPrice = () => {
  if (sortOrderPrice.value === 'asc') {
    filteredProducts.value.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    sortOrderPrice.value = 'desc'
  } else {
    filteredProducts.value.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    sortOrderPrice.value = 'asc'
  }
}

onMounted(() => {
  const storeId = Number(route.query.id)
  fetchProducts(Number(route.query.id))
  fetchStoreName(storeId)
})

const handleFilter = () => {
  const query = searchQuery.value.toLowerCase()
  filteredProducts.value = products.value.filter((product) => 
    product.title.toLowerCase().includes(query)
  ).map(product => ({
    ...product,
    image_url: `${import.meta.env.VITE_APP_API_URL}${product.image_url}`
  }))
}

const increaseQuantity = (product: Product) => {
  product.quantity! += 1
}

const decreaseQuantity = (product: Product) => {
  if (product.quantity! >= 1) {
    product.quantity! -= 1
  }
}

const handleAddToCart = (product: Product) => {
  const object = { ...product,
    store_id: Number(route.query.id)
  }
  addToCart(object);
  console.log(`Adicionado ao carrinho: ${product.title}, Quantidade: ${product.quantity}`);
  product.quantity = 0
};

</script>

<template>
  <div class="table-container">
    <ContainerStyled width="68.75rem" height="3.5rem" backgroundColor="transparent">
      <TitleStyled className="title-styled" :title="`Produtos de ${storeName}`" />
    </ContainerStyled>
    <ContainerStyled width="68.75rem" height="3.5rem" :backgroundColor="'var(--light-red)'">
      <InputStyled
        v-model="searchQuery"
        id="storeSearch"
        type="text"
        width="46rem"
        height="2.8rem"
        placeholder="Pesquisar pelo nome do produto"
        borderColor="transparent"
        class="custom-height"
        @input="handleFilter"
      />
      <ButtonStyled
        @click="sortByName"
        label="Ordenar por nome"
        className="login-button"
        width="10rem"
        height="2.5rem"
      >
        <template #default>
          Ordenar por Nome
          <span v-if="sortOrderName === 'asc'">▲</span>
          <span v-else>▼</span>
        </template>
      </ButtonStyled>
      <ButtonStyled
        @click="sortByPrice"
        label="Ordenar por preço"
        className="login-button"
        width="10rem"
        height="2.5rem"
      >
        <template #default>
          Ordenar por Preço
          <span v-if="sortOrderPrice === 'asc'">▲</span>
          <span v-else>▼</span>
        </template>
      </ButtonStyled>
    </ContainerStyled>

    <div class="cards-container">
      <div class="card" v-for="product in filteredProducts" :key="product.id">
        <img :src="product.thumbnail_url" alt="Product Image" class="card-thumbnail" />
        <div class="card-content">
          <h1>{{ product.title }}</h1>
          <p>{{ product.description }}</p>
          <p class="price">{{ product.price }}</p>
          <div class="quantity-container">
            <ButtonStyled 
              @click="decreaseQuantity(product)"
              className="transparent-button-red-text"
              label="-"
              width="1rem"
              height="2.8rem"/>
            <InputStyled 
              type="number" 
              v-model.number="product.quantity" min="1"
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
            @click="handleAddToCart(product)"
            className="login-button"
            label="Adicionar ao carrinho"
            width="14rem"
            height="2rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quantity-container{
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 2px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 68.75rem;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  flex: calc(25%- 1rem); 
  max-width: 260px;
}

.card-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-content h1 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.card-content p {
  margin: 0.5rem 0;
}

.card-content .price {
  font-weight: bold;
  color: #333;
}
</style>