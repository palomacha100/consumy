<script setup lang="ts">
import { ref } from 'vue'
import { Auth } from '../auth'
import { useRouter } from 'vue-router';
const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const route = useRouter()

const signOut = () => {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
    currentUser.value = auth.currentUser()
    sessionStorage.removeItem('active');
    route.push('/signIn')
  })
}
</script>

<template>
  <main>
    <h3>Olá, {{ currentUser && currentUser.email }}</h3>

    <br />
    <nav>
      <a @click="signOut">Sair</a>
    </nav>
  </main>
</template>
