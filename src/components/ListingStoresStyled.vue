<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { StoreService } from '../api/storeService'
import TitleStyled from './TitleStyled.vue'
import InputStyled from './InputStyled.vue'
import ContainerStyled from './ContainerStyled.vue'
import { useRouter } from 'vue-router'
import ButtonStyled from './ButtonStyled.vue'

const router = useRouter()

interface Store {
  id: number
  name: string
  image_url: string
  active: boolean
}

const storeService = new StoreService()
const stores = ref<Store[]>([])
const searchQuery = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const fetchStores = async () => {
  await storeService.getStores(
    (data: Store[]) => {
      stores.value = data.map(store => ({
        ...store,
        active: store.active
      }))
    },
    () => {
      console.error('Failed to fetch stores')
    }
  )
}

const sortByName = () => {
  if (sortOrder.value === 'asc') {
    stores.value.sort((a, b) => a.name.localeCompare(b.name))
    sortOrder.value = 'desc'
  } else {
    stores.value.sort((a, b) => b.name.localeCompare(a.name))
    sortOrder.value = 'asc'
  }
}

const filteredStores = computed(() => {
  return stores.value.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  fetchStores()
})

const showProducts = (id: number) => {
  router.push({path: './listingProducts', query: { id }})
}
</script>

<template>
  <div class="table-container">
    <ContainerStyled backgroundColor="transparent">
      <TitleStyled className="title-styled" title="Lojas" />
    </ContainerStyled>
    <ContainerStyled width="68.75rem" height="3.5rem" :backgroundColor="'var(--light-red)'">
      <InputStyled
        v-model="searchQuery"
        id="storeSearch"
        type="text"
        width="67rem"
        height="2.8rem"
        placeholder="Pesquisar pelo nome da loja"
        borderColor="transparent"
        class="custom-height"
      />
    </ContainerStyled>

    <table>
      <thead>
        <tr>
          <th></th>
          <th @click="sortByName">
            Lojas
            <span v-if="sortOrder === 'asc'">▲</span>
            <span v-if="sortOrder === 'desc'">▼</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="store in filteredStores" :key="store.id">
          <td><img :src="store.image_url" alt="Store Image" class="thumbnail" /></td>
          <td>{{ store.name }}</td>
          <td>
            <ButtonStyled
              className="login-button"
              label="Ver produtos"
              width="8rem"
              height="2rem"
              @click="showProducts(store.id)"
                />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 30px;
}

.table-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

table {
  width: 1100px;
  border-collapse: collapse;
  margin-top: 0.5rem;
  
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 10px solid rgba(237, 228, 161, 0.1);
  font-family: 'Poppins';
  font-weight: 700;
  color: var(--dark-gray);
}


th {
  cursor: pointer;
  background-color: var(--light-red);
  
}

th span {
  margin-left: 5px;
  font-size: 12px;
  color: #888;
}

button {
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button:active {
  transform: scale(0.98);
}

.edit-button {
  background-color: var(--dark-blue);
  color: white;
}

.delete-button {
  background-color: var(--red);
  color: white;
}

.status-button.active {
  background-color: var(--green);
  color: white;
}

.status-button.inactive {
  background-color: var(--dark-gray);
  color: white;
}

@media (max-width: 768px) {

  .table-container {
    width: 100%;
  }
  table {
    width: 100%;
  }
}
</style>
