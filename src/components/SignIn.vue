<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
import ButtonStyled from './ButtonStyled.vue'
import InputStyled from './InputStyled.vue'
import TextStyled from './TextStyled.vue'
import AccessControlContainer from './AccessControlContainer.vue'

const router = useRouter()

const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })
const awaiting = ref(false)
const checked = defineModel<boolean>('remember', { default: true })

const errorEmail = ref('')
const errorPassword = ref('')
const errorCredential = ref('')

const onSubmit = () => {
  const auth = new Auth(checked.value)
  console.log(checked.value)
  if (email.value == '') {
    return (errorEmail.value = 'É necessário informar um email')
  }
  if (password.value == '') {
    return (errorPassword.value = 'É necessário informar uma senha')
  }

  awaiting.value = true
  auth.signIn(
    email.value || '',
    password.value || '',
    () => {
      awaiting.value = false

      router.push('/home')
    },
    () => {
      awaiting.value = false
      console.log('Não foi dessa vez!')
      errorCredential.value = 'Email ou senha incorretos. Confira-os'
    }
  )
}

function handleEmail() {
  const re = /\S+@\S+\.\S+/
  if (!re.test(email.value)) {
    errorEmail.value = 'Por favor, digite um email válido'
  } else {
    errorEmail.value = ''
  }
}

function handlePassword() {
  if (password.value.length < 6) {
    errorPassword.value = 'Por favor, digite uma senha válida'
  } else {
    errorPassword.value = ''
  }
}
</script>

<template>
  <AccessControlContainer>
    <form @submit.prevent="onSubmit">
      <InputStyled
        v-model="email"
        id="email"
        type="email"
        width="22.5rem"
        height="2.8rem"
        placeholder="Digite seu email"
        borderColor="transparent"
        :handleChange="handleEmail"
        :error="errorEmail"
      />

      <InputStyled
        v-model="password"
        id="password"
        type="password"
        width="22.5rem"
        height="2.8rem"
        placeholder="Digite sua senha"
        borderColor="transparent"
        :handleChange="handlePassword"
        :error="errorPassword"
      />

      <InputStyled
        v-model="checked"
        id="checked"
        type="checkbox"
        width="9rem"
        height="2rem"
        class="radio-container"
        label="Lembrar-me"
        placeholder=""
      />

      <ButtonStyled
        type="submit"
        v-show="!awaiting"
        className="login-button"
        label="Entrar"
        width="22.5rem"
        height="2.8rem"
      />
      <span>{{ errorCredential }}</span>
    </form>
    <nav>
      <RouterLink :to="{ name: 'rememberPassword' }"
        ><ButtonStyled
          className="transparent-button-blue-text"
          label="Esqueceu a senha?"
          width="11rem"
          height="3rem"
      /></RouterLink>
    </nav>
    <div class="sign-up-container">
      <TextStyled
        text="Não tem uma conta?"
        width="11rem"
        height="2.8rem"
        className="grey-bold-text"
      />
      <nav>
        <RouterLink :to="{ name: 'signUp' }">
          <ButtonStyled
            className="transparent-button-blue-text"
            label="Cadastre-se"
            width="8rem"
            height="2.8rem"
          />
        </RouterLink>
      </nav>
    </div>
  </AccessControlContainer>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  height: 17rem;
  justify-content: space-around;
  gap: 5px;
}
nav {
  display: flex;
  justify-content: center;
}

span {
  color: var(--red);
  font-size: 0.75rem;
}

.sign-up-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
