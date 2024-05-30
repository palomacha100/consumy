<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
import InputStyled from '../components/InputStyled.vue'
import ButtonStyled from '../components/ButtonStyled.vue'
import AccessControlContainer from '../components/AccessControlContainer.vue'
import TextStyled from '../components/TextStyled.vue'

const router = useRouter()

const email = defineModel<string>('email', { default: '' })
const errorEmail = ref<string>('')
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

function onSubmit() {
  if (email.value == '') {
    return (errorEmail.value = 'É necessário informar um email')
  }

  awaiting.value = true
  auth.rememberPassword(
    email.value || '',

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
        text="Insira o seu email. Caso esteja cadastrado, enviaremos um link para você voltar a acessar a sua conta."
        className="gray-text"
        width="22.5rem"
        height="3rem"
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
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  height: 17rem;
  justify-content: space-around;
  gap: 5px;
  :first-child {
    text-align: center;
  }
}

nav {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
</style>
