<script setup lang="ts">
import { defineModel, reactive, onMounted, ref } from 'vue'
import ButtonStyled from '../components/ButtonStyled.vue'
import InputStyled from '../components/InputStyled.vue'
import TextStyled from '../components/TextStyled.vue'
import TitleStyled from '../components/TitleStyled.vue'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'
import ContainerStyled from '../components/ContainerStyled.vue'

const fullName = defineModel<string>('fullName', { default: '' })
const cpf = defineModel<string>('cpf', { default: '' })
const phoneNumber = defineModel<string>('phoneNumber')
const city = defineModel<string>('city', { default: '' })
const cep = defineModel<string>('cep')
const state = defineModel<string>('state', { default: '' })
const neighborhood = defineModel<string>('neighborhood', { default: '' })
const address = defineModel<string>('address', { default: '' })
const numberAddress = defineModel<string>('numberAddress')
const complementAddress = defineModel<string>('complementAddress', { default: '' })
const isStoreExists = ref(false)
const isEditing = ref(false)
const route = useRoute()

const errors = reactive({
  fullName: '',
  cpf: '',
  phoneNumber: '',
  cep: '',
  numberAddress: ''
})

const validateField = (
  value: any,
  minLength: number | undefined,
  exactLengths: number[] | undefined,
  campo: string
): string => {
  if (minLength !== undefined && value.toString().length < minLength) {
    return `Digite um campo de ${campo} válido (pelo menos ${minLength} caracteres)`
  }

  if (exactLengths !== undefined && !exactLengths.includes(value.toString().length)) {
    return `Digite um campo de ${campo} válido (com ${exactLengths.join(' ou ')} caracteres)`
  }
  return ''
}

const handleFullName = (event: Event) => {
  fullName.value = (event.target as HTMLInputElement).value
  errors.fullName = validateField(fullName.value, 3, undefined, 'nome')
  localStorage.setItem('fullName', (event.target as HTMLInputElement).value)
}

const handleCpf = (event: Event) => {
  errors.cpf = validateField(cpf.value, undefined, [11], 'CPF')
  cpf.value = (event.target as HTMLInputElement).value
  localStorage.setItem('cpf', (event.target as HTMLInputElement).value)
}

const handlePhoneNumber = (event: Event) => {
  errors.phoneNumber = validateField(phoneNumber.value, undefined, [10, 11], 'telefone')
  phoneNumber.value = (event.target as HTMLInputElement).value
  localStorage.setItem('phoneNumber', (event.target as HTMLInputElement).value)
}

const handleCep = (event: Event) => {
  errors.cep = validateField(cep.value, undefined, [8], 'telefone')
  cep.value = (event.target as HTMLInputElement).value
  localStorage.setItem('cep', (event.target as HTMLInputElement).value)
}

const handleNumberAddress = (event: Event) => {
  errors.numberAddress = validateField(numberAddress.value, 1, undefined, 'numero')
  numberAddress.value = (event.target as HTMLInputElement).value
  localStorage.setItem('numberAddress', (event.target as HTMLInputElement).value)
}

const handleComplementAddress = (event: Event) => {
  complementAddress.value = (event.target as HTMLInputElement).value
  localStorage.setItem('complementAddress', (event.target as HTMLInputElement).value)
}

const handleCpfInput = (event: InputEvent) => {
  const input = event.target as HTMLInputElement
  const newValue = input.value.replace(/\D/g, '')
  input.value = newValue
  cpf.value = newValue
}

const handlePhoneInput = (event: InputEvent) => {
  const input = event.target as HTMLInputElement
  const newValue = input.value.replace(/\D/g, '')
  input.value = newValue
  phoneNumber.value = newValue
}

const canCompleteProfile = () => {
  return (
    fullName.value !== '' &&
    cpf.value !== undefined &&
    phoneNumber.value !== undefined &&
    city.value !== '' &&
    cep.value !== undefined &&
    state.value !== '' &&
    neighborhood.value !== '' &&
    address.value !== '' &&
    numberAddress.value !== undefined
  )
}

const addressSearch = (event: Event) => {
  event.preventDefault()
  fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cep) {
        neighborhood.value = data.bairro || ''
        city.value = data.localidade || ''
        state.value = data.uf || ''
        address.value = data.logradouro || ''
        localStorage.setItem('state', state.value)
        localStorage.setItem('neighborhood', neighborhood.value)
        localStorage.setItem('city', city.value)
        localStorage.setItem('address', address.value)
      } else {
        console.error('CEP não encontrado.'), () => Swal.fire('CEP não encontrado')
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar CEP:', error)
    })
}

const getModelByName = {
  fullName,
  cpf,
  phoneNumber,
  cep,
  state,
  city,
  neighborhood,
  address,
  numberAddress,
  complementAddress,
}

onMounted(() => {
  const formData = [
    'fullName',
    'cpf',
    'phoneNumber',
    'cep',
    'state',
    'city',
    'neighborhood',
    'address',
    'numberAddress',
    'complementAddress',
  ]
  formData.forEach((field) => {
    const storeData = localStorage.getItem(field) || ''
    const storeSeller = storeData ? storeData : null
    if (storeSeller !== null) {
      getModelByName[field as keyof typeof getModelByName].value = storeSeller
    }
  })
    
  if (!address.value && !isStoreExists.value) {
    isStoreExists.value = true
  }
  if (route.query.isEditing === 'true') {
    isEditing.value = true
  }
  if (route.query.isNewProduct === 'true') {
    isEditing.value = true
    fullName.value = ''
    cpf.value = ''
    phoneNumber.value = ''
    city.value = ''
    cep.value = ''
    state.value = ''
    neighborhood.value = ''
    address.value = ''
    numberAddress.value = ''
    complementAddress.value = ''
  }
})

const handleCreateProfile = () => {
  Swal.fire({
  text: 'Dados salvos com sucesso.',
  confirmButtonText: 'ok',
  confirmButtonColor: '#cc4b4e',
})
}

const handleUpdateProfile = () => {
  Swal.fire({
  text: 'Perfil atualizado com sucesso.',
  confirmButtonText: 'ok',
  confirmButtonColor: '#cc4b4e',
})
}

const handleEdit = () => {
  isEditing.value = true
}

</script>
<template>
  <template v-if="isStoreExists || isEditing">
    <div class="main-container">
      <form>
        <ContainerStyled width="800px" height="4.5rem" backgroundColor="transparent">
          <TitleStyled className="title-styled" title="Edição de perfil" />
        </ContainerStyled>
          <InputStyled
            v-model="fullName"
            id="fullName"
            type="text"
            width="100%"
            height="2.8rem"
            placeholder="Digite seu nome completo"
            borderColor="transparent"
            :error="errors.fullName"
            :handleChange="handleFullName"
          />
          <div class="data-container">
            <InputStyled
              v-model="cpf"
              id="cpf"
              type="string"
              width="24rem"
              height="2.8rem"
              placeholder="CPF (apenas números)"
              borderColor="transparent"
              :error="errors.cpf"
              :handleChange="handleCpf"
              @input="handleCpfInput"
            />
            <InputStyled
              v-model="phoneNumber"
              id="phoneNumber"
              type="string"
              width="24rem"
              height="2.8rem"
              placeholder="Telefone (apenas números)"
              borderColor="transparent"
              :error="errors.phoneNumber"
              :handleChange="handlePhoneNumber"
              @input="handlePhoneInput"
            />
          </div>
          <div class="data-container">
            <div class="cepSearch">
              <InputStyled
                v-model="cep"
                id="cep"
                type="number"
                width="24rem"
                height="2.8rem"
                placeholder="CEP (apenas números)"
                borderColor="transparent"
                :error="errors.cep"
                :handleChange="handleCep"
              />
              <ButtonStyled
                className="transparent-button-red-text"
                label="Pesquisar CEP"
                width="8rem"
                height="2.8rem"
                @click="addressSearch"
              />
            </div>
              <InputStyled
              v-model="state"
              id="state"
              type="text"
              placeholder="Estado"
              width="24rem"
              height="2.8rem"
              borderColor="transparent"
              disabled
            />
          </div>
          <div class="data-container">
            <InputStyled
              v-model="city"
              id="city"
              type="text"
              width="24rem"
              height="2.8rem"
              placeholder="Cidade"
              borderColor="transparent"
              disabled
            />
            <InputStyled
              v-model="neighborhood"
              id="neighborhood"
              type="text"
              width="24rem"
              height="2.8rem"
              placeholder="Bairro"
              borderColor="transparent"
              disabled
              />
          </div>
        <InputStyled
          v-model="address"
          id="address"
          type="text"
          width="100%"
          height="2.8rem"
          placeholder="Endereço"
          borderColor="transparent"
          disabled
        />
        <div class="data-container">
          <InputStyled
            v-model="numberAddress"
            id="numberAddress"
            type="number"
            width="24rem"
            height="2.8rem"
            placeholder="Número"
            borderColor="transparent"
            :error="errors.numberAddress"
            :handleChange="handleNumberAddress"
          />
          <InputStyled
            v-model="complementAddress"
            id="complementAddress"
            type="text"
            width="24rem"
            height="2.8rem"
            placeholder="Complemento (opcional)"
            borderColor="transparent"
            :handleChange="handleComplementAddress"
          />
        </div>
        <div class="button-container">
          <ButtonStyled
            @click.prevent="isEditing ? handleUpdateProfile() : handleCreateProfile()"
            type="submit"
            className="login-button"
            :label="isEditing ? 'Atualizar' : 'Enviar'"
            width="22.5rem"
            height="2.8rem"
          />
        </div>
      </form>
    </div>
  </template>
  <template v-else>
    <div class="main-container">
      <div class="profile">
       
          <TitleStyled :title="`${fullName}`" class="title-styled" />
          <TextStyled
            className="gray-text"
            width=" 800px"
            height="2.5rem"
            :text="`CPF: ${cpf}`"
          />
          <TextStyled
            className="gray-text"
            width=" 800px"
            height="2.5rem"
            :text="`Telefone: ${phoneNumber}`"
          />
          <TextStyled
            className="gray-text"
            width=" 800px"
            height="2.5rem"
            :text="`Endereço: ${address}, ${numberAddress}, ${complementAddress}, ${neighborhood}`"
          />
          <TextStyled
            className="gray-text"
            width=" 800px"
            height="2.5rem"
            :text="`CEP: ${cep} - ${city} - ${state}`"
          />
          <div class="button-container">
            <ButtonStyled
              @click="handleEdit"
              type="submit"
              className="login-button"
              label="Editar"
              width="15rem"
              height="2.5rem"
            />
            <nav>
              <RouterLink :to="{ name: 'home' }">
                <ButtonStyled
                  type="submit"
                  className="login-button"
                  label="Voltar ao início"
                  width="15rem"
                  height="2.5rem"
                />
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>
    
  </template>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 800px;
  height: 100%;
}

.data-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
}

.cepSearch {
  display: flex;
  flex-direction: column;
  height: 80px;
}

.title-styled {
  width: 800px;
}

.button-container {
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>

<style>
  .profile {
  display: flex;
  background-color: var(--white);
  justify-content: space-around;
  flex-direction: column;
  margin: 30px auto;
  width: 800px;
  height: auto;
  border-radius: 5px;
  padding: 10px;
  gap: 10px;

}
</style>
