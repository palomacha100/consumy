<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
import InputStyled from './InputStyled.vue'
import ButtonStyled from './ButtonStyled.vue'
import AccessControlContainer from './AccessControlContainer.vue'
import TextStyled from './TextStyled.vue'

const router = useRouter()

const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })
const password_confirmation = defineModel<string>('password_confirmation', { default: '' })
const errorEmail = ref<string>('')
const errorPassword = ref<string>('')
const errorPasswordConfirmation = ref<string>('')
const registerError = ref<string>('')

const awaiting = ref<boolean>(false)

const auth = new Auth()

function handleEmail() {
  const re = /\S+@\S+\.\S+/
  if (!re.test(email.value)) {
    errorEmail.value = 'Por favor, digite um email válido'
  } else {
    errorEmail.value = ''
  }
}

function handlePassword() {
  if (password.value !== password_confirmation.value || password.value == '') {
    errorPasswordConfirmation.value = 'As senhas não coincidem'
  } else {
    errorPasswordConfirmation.value = ''
  }
}

function onSubmit() {
  if (email.value == '') {
    return (errorEmail.value = 'É necessário informar um email')
  }
  if (password.value.length < 6) {
    return (errorPassword.value = 'A senha deve conter no mínimo 6 caracteres')
  }
  if (password.value == '') {
    return (errorPassword.value = 'É necessário informar uma senha')
  }
  if (password_confirmation.value == '') {
    return (errorPassword.value = 'É necessário confirmar a senha')
  }
  awaiting.value = true
  auth.signUp(
    email.value || '',
    password.value || '',
    password_confirmation.value || '',
    () => {
      awaiting.value = false
      router.push('/')
    },
    (error = '') => {
      awaiting.value = false
      registerError.value = error
      console.log('não foi dessa vez!')
    }
  )
}
</script>
<template>
  <AccessControlContainer>
    <form @submit.prevent="onSubmit">
      <TextStyled
        text="Cadastre-se para criar sua loja e vender seus produtos."
        className="gray-text"
        width="22.5rem"
        height="2.8rem"
      />
      <InputStyled
        v-model="email"
        type="email"
        id="email"
        width="22.5rem"
        height="2.8rem"
        placeholder="Digite seu email"
        borderColor="transparent"
        :handleChange="handleEmail"
        :error="errorEmail"
      />

      <InputStyled
        v-model="password"
        type="password"
        id="password"
        width="22.5rem"
        height="2.8rem"
        placeholder="Digite sua senha"
        borderColor="transparent"
        :handleChange="handlePassword"
        :error="errorPassword"
      />

      <InputStyled
        v-model="password_confirmation"
        type="password"
        id="password_confirmation"
        width="22.5rem"
        height="2.8rem"
        placeholder="Confirme sua senha"
        borderColor="transparent"
        :handleChange="handlePassword"
        :error="errorPasswordConfirmation"
      />

      <span>{{ registerError }}</span>

      <ButtonStyled
        type="submit"
        v-show="!awaiting"
        className="login-button"
        label="Cadastrar"
        width="22.5rem"
        height="2.8rem"
      />
    </form>
    <nav>
      <RouterLink :to="{ name: 'signIn' }">
        <ButtonStyled
          className="transparent-button-blue-text"
          label="Voltar ao login"
          width="8rem"
          height="2.8rem"
        />
      </RouterLink>
    </nav>
  </AccessControlContainer>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 22rem;
  gap: 5px;
  :first-child {
    text-align: center;
  }
}
span {
  color: var(--red);
  font-size: 0.875rem;
  align-self: center;
  margin: 5px 0;
}

nav {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 15px 0 0 0;
}
</style>
