<script setup lang="ts">
import { ref } from 'vue';
import ImageStyled from './ImageStyled.vue';

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
</script>

<template>
  <nav class="navbar">
    <div class="container-fluid">
        <ImageStyled
            imageUrl="../../images/logo.png"
            altText="Logo com nome do app Link to Food em vermelho"
            width="6rem"
          />
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">Início</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Pedidos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Lojas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Estatísticas</a>
            </li>
        </ul>

        <div class="nav-icon">
            <div class="dropdown" @click="toggleNotificationDropdown">
                <a class="icons" href="#" >
                    <img src="../assets/notification-bell.svg" alt="Notification bell" height="24">
                    <span class="notification">1</span>
                </a>
                <ul class="dropdown-menu" v-if="showNotificationDropdown">
                    <li><a class="dropdown-item" href="#">Notificação 1</a></li>
                    <li><a class="dropdown-item" href="#">Notificação 2</a></li>
                </ul>
            </div>
            <a class="icons" href="order">
                <img src="../assets/shopping-cart.svg" alt="Shopping cart" height="24"/>
                <span class="notification">1</span>
            </a>
            <div class="dropdown" @click="toggleAvatarDropdown">
                <a class="icons dropdown-toggle" href="#">
                    <img class="avatar-image" src="../../public/images/mood.png" alt="User image"/>
                </a>
                <ul class="dropdown-menu" v-if="showAvatarDropdown">
                    <li><a class="dropdown-item" href="#">Meu perfil</a></li>
                    <li><a class="dropdown-item" href="#">Sair</a></li>
                </ul>
            </div>
        </div>
 
      </div>
    </nav>
  </template>

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

.navbar-nav {
  display: flex;
  gap: 30px;
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


.nav-link {
  color: var(--dark-gray);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--red);
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


.navbar-collapse {
  display: flex;
  justify-content: space-around;
}
</style>


  
  