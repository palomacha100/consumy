<template>
  <nav class="navbar">
    <div class="container-fluid">
      <ImageStyled
        imageUrl="../../images/logo.png"
        altText="Logo com nome do app Link to Food em vermelho"
        width="6rem"
      />
       <div class="nav-icon">
        <div class="dropdown" @click="toggleNotificationDropdown">
          <a class="icons" href="#">
            <img src="../assets/notification-bell.svg" alt="Notification bell" height="24">
            <span class="notification">1</span>
          </a>
          <ul class="dropdown-menu" v-if="showNotificationDropdown">
            <li><a class="dropdown-item" href="#">Notificação 1</a></li>
            <li><a class="dropdown-item" href="#">Notificação 2</a></li>
          </ul>
        </div>
        <a class="icons" href="shoppingCart">
          <img src="../assets/shopping-cart.svg" alt="Shopping cart" height="24"/>
          <span class="notification">{{ totalItemsInCart }}</span>
        </a>
        <div class="dropdown" @click="toggleAvatarDropdown">
          <a class="icons dropdown-toggle" href="#">
            <img class="avatar-image" src="../../images/mood.png" alt="User image"/>
          </a>
          <ul class="dropdown-menu" v-if="showAvatarDropdown">
            <li><a class="dropdown-item" href="home">Início</a></li>
            <li><a class="dropdown-item" href="#">Pedidos</a></li>
            <li><a class="dropdown-item" href="listingStores">Lojas</a></li>
            <li><a class="dropdown-item" href="#">Estatísticas</a></li>
            <li class="divider"></li>
            <li><a class="dropdown-item" href="profile">Meu perfil</a></li>
            <li><a class="dropdown-item" href="profile">Minha carteira</a></li>
            <li><a @click="signOut" class="dropdown-item" href="#">Sair</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImageStyled from './ImageStyled.vue';
import { Auth } from '../auth'
import { useRouter } from 'vue-router';
import { totalItemsInCart } from '@/api/cartService';

const auth = new Auth;
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const showNotificationDropdown = ref(false);
const showAvatarDropdown = ref(false);

const toggleNotificationDropdown = () => {
  showNotificationDropdown.value = !showNotificationDropdown.value;
  showAvatarDropdown.value = false;
};

const toggleAvatarDropdown = () => {
  showAvatarDropdown.value = !showAvatarDropdown.value;
  showNotificationDropdown.value = false;
};

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

<style scoped>
a {
    text-decoration: none;
}
img {
    width: 25px;
    height: 25px;
}

.avatar-image {
    width: 35px;
    height: 35px;
    border-radius: 30px;
}

.container-fluid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.navbar {
  background-color: var(--white);
}

.navbar-toggler {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-icon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 130px;
}

.nav-icon a {
    align-self: center;
    cursor: pointer;
}

.dropdown-menu {
  background-color: var(--white);
  color: var(--dark-blue);
  position: absolute;
  right: 0;
  background-color: var(--white);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  min-width: 100px;
  z-index: 1;
  padding: 5px;
  margin: 10px;
}

.dropdown-item {
  color: var(--dark-blue);
  text-decoration: none;
}

.dropdown-item:hover {
  color: var(--white);
}

.dropdown li:hover {
    background-color: var(--dark-blue);
    border-radius: 2px;
}

.notification {
    font-size: 20px;
    text-decoration: none;
    color: var(--red);
    font-weight: 700;
}

@media (max-width: 768px) {
  .container-fluid {
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .navbar-nav {
    flex-direction: column;
    width: 100%;
  }
  .nav-icon {
    width: 100%;
    justify-content: end;
  }
}

@media (max-width: 576px) {
  .navbar-nav {
    display: none;
  }
  .nav-icon {
    justify-content: end;
    width: 100%;
    gap: 5px
  }
  .nav-icon a {
    margin-right: 10px;
  }
  .nav-link {
    display: block;
    margin: 10px 0;
  }
}
</style>



  
  