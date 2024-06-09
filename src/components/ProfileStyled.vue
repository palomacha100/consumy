<script setup lang="ts">
import { defineModel, reactive, onMounted, ref } from 'vue'
import ButtonStyled from '../components/ButtonStyled.vue'
import InputStyled from '../components/InputStyled.vue'
import TextStyled from '../components/TextStyled.vue'
import TitleStyled from '../components/TitleStyled.vue'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import ContainerStyled from '../components/ContainerStyled.vue'
import { Auth } from '@/auth'

const name = defineModel<string>('name', { default: '' })
const cpf = defineModel<string>('cpf', { default: '' })
const phonenumber = defineModel<string>('phoneNumber')
const city = defineModel<string>('city', { default: '' })
const cep = defineModel<string>('cep')
const state = defineModel<string>('state', { default: '' })
const neighborhood = defineModel<string>('neighborhood', { default: '' })
const address = defineModel<string>('address', { default: '' })
const numberaddress = defineModel<string>('numberAddress')
const complementaddress = defineModel<string>('complementAddress', { default: '' })
const isStoreExists = ref(false)
const isEditing = ref(false)
const route = useRoute()
const router = useRouter()
const auth = new Auth()

const errors = reactive({
  name: '',
  cpf: '',
  phonenumber: '',
  cep: '',
  numberaddress: ''
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
  name.value = (event.target as HTMLInputElement).value
  errors.name = validateField(name.value, 3, undefined, 'nome')
  localStorage.setItem('name', (event.target as HTMLInputElement).value)
}

const handleCpf = (event: Event) => {
  errors.cpf = validateField(cpf.value, undefined, [11], 'CPF')
  cpf.value = (event.target as HTMLInputElement).value
  localStorage.setItem('cpf', (event.target as HTMLInputElement).value)
}

const handlePhoneNumber = (event: Event) => {
  errors.phonenumber = validateField(phonenumber.value, undefined, [10, 11], 'telefone')
  phonenumber.value = (event.target as HTMLInputElement).value
  localStorage.setItem('phonenumber', (event.target as HTMLInputElement).value)
}

const handleCep = (event: Event) => {
  errors.cep = validateField(cep.value, undefined, [8], 'telefone')
  cep.value = (event.target as HTMLInputElement).value
  localStorage.setItem('cep', (event.target as HTMLInputElement).value)
}

const handleNumberAddress = (event: Event) => {
  errors.numberaddress = validateField(numberaddress.value, 1, undefined, 'numero')
  numberaddress.value = (event.target as HTMLInputElement).value
  localStorage.setItem('numberaddress', (event.target as HTMLInputElement).value)
}

const handleComplementAddress = (event: Event) => {
  complementaddress.value = (event.target as HTMLInputElement).value
  localStorage.setItem('complementaddress', (event.target as HTMLInputElement).value)
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
  phonenumber.value = newValue
}

const canCompleteProfile = () => {
  return (
    name.value !== '' &&
    cpf.value !== undefined &&
    phonenumber.value !== undefined &&
    city.value !== '' &&
    cep.value !== undefined &&
    state.value !== '' &&
    neighborhood.value !== '' &&
    address.value !== '' &&
    numberaddress.value !== undefined
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
  name,
  cpf,
  phonenumber,
  cep,
  state,
  city,
  neighborhood,
  address,
  numberaddress,
  complementaddress,
}

onMounted(() => {
  const formData = [
    'name',
    'cpf',
    'phonenumber',
    'cep',
    'state',
    'city',
    'neighborhood',
    'address',
    'numberaddress',
    'complementaddress',
  ]
  auth.getUser((user) => {
    formData.forEach((field) => {
      getModelByName[field].value = user[field] || ''

    })
  },
    () => {
      Swal.fire({
        text: 'Erro ao buscar dados do usuário.',
        confirmButtonText: 'ok',
        confirmButtonColor: '#cc4b4e',
      })
    });
    
  if (!address.value && !isStoreExists.value) {
    isStoreExists.value = true
  }
  if (route.query.isEditing === 'true') {
    isEditing.value = true
  }
  if (route.query.isNewProduct === 'true') {
    isEditing.value = true
    name.value = ''
    cpf.value = ''
    phonenumber.value = ''
    city.value = ''
    cep.value = ''
    state.value = ''
    neighborhood.value = ''
    address.value = ''
    numberaddress.value = ''
    complementaddress.value = ''
  }
})

const handleCreateProfile = () => {
  auth.updateUser(
    {
      name: name.value,
      cpf: cpf.value,
      phonenumber: phonenumber.value,
      cep: cep.value,
      state: state.value,
      city: city.value,
      neighborhood: neighborhood.value,
      address: address.value,
      numberAddress: numberaddress.value,
      complementAddress: complementaddress.value,
    },
    () => {
      Swal.fire({
        text: 'Dados salvos com sucesso.',
        confirmButtonText: 'ok',
        confirmButtonColor: '#cc4b4e',
      })
    },
    () => {
      Swal.fire({
        text: 'Erro ao salvar dados.',
        confirmButtonText: 'ok',
        confirmButtonColor: '#cc4b4e',
      })
    }
  )
}

const deleteAccount = async () => {
  auth.deleteUser(() => {
    Swal.fire({
      text: 'Conta excluída com sucesso.',
      confirmButtonText: 'ok',
      confirmButtonColor: '#cc4b4e',
    }),
    router.push({ name: 'home' })
  }, () => {
    Swal.fire({
      text: 'Erro ao excluir conta.',
      confirmButtonText: 'ok',
      confirmButtonColor: '#cc4b4e',
    })
  }
)};

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
            class="full-input"
            v-model="name"
            id="fullName"
            type="text"        
            placeholder="Digite seu nome completo"
            :error="errors.name"
            :handleChange="handleFullName"
          />
          <div class="data-container">
            <InputStyled
              class="full-input"
              v-model="cpf"
              id="cpf"
              placeholder="CPF (apenas números)"
              :error="errors.cpf"
              :handleChange="handleCpf"
              @input="handleCpfInput"
            />
            <InputStyled
              v-model="phonenumber"
              class="full-input"
              id="phoneNumber"
              type="string"
              placeholder="Telefone (apenas números)"
              :error="errors.phonenumber"
              :handleChange="handlePhoneNumber"
              @input="handlePhoneInput"
            />
          </div>
          <div class="data-container">
            <div class="cepSearch">
              <InputStyled
                class="full-input"
                v-model="cep"
                id="cep"
                type="number"
                placeholder="CEP (apenas números)"
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
              class="full-input"
              v-model="state"
              id="state"
              type="text"
              placeholder="Estado"
              disabled
            />
          </div>
          <div class="data-container">
            <InputStyled
              class="full-input"
              v-model="city"
              id="city"
              type="text"             
              placeholder="Cidade"
              disabled
            />
            <InputStyled
              class="full-input"
              v-model="neighborhood"
              id="neighborhood"
              type="text"            
              placeholder="Bairro"
              disabled
              />
          </div>
        <InputStyled
          class="full-input"
          v-model="address"
          id="address"
          type="text"       
          placeholder="Endereço"
          disabled
        />
        <div class="data-container">
          <InputStyled
            class="full-input"
            v-model="numberaddress"
            id="numberAddress"
            type="number"
            placeholder="Número"
            :error="errors.numberaddress"
            :handleChange="handleNumberAddress"
          />
          <InputStyled
            class="full-input"
            v-model="complementaddress"
            id="complementAddress"
            type="text"
            placeholder="Complemento (opcional)"
            :handleChange="handleComplementAddress"
          />
        </div>
        <ButtonStyled className="transparent-button-red-text"
              label="Excluir minha conta"
              width="12rem"
              height="2.8rem"
              @click.prevent="deleteAccount"/>
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
       
          <TitleStyled className="title-styled" :title="`${name}`" class="title-styled" />
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
            :text="`Telefone: ${phonenumber}`"
          />
          <TextStyled
            className="gray-text"
            width=" 800px"
            height="2.5rem"
            :text="`Endereço: ${address}, ${numberaddress}, ${complementaddress}, ${neighborhood}`"
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
