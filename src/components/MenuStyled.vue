<script setup lang="ts">
  import { ref } from 'vue';
  import ImageStyled from './ImageStyled.vue';
  
  const isCollapsed = ref(false);
  
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  </script>

<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          @click="toggleCollapse"
          class="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
  
        <!-- Collapsible wrapper -->
        <div :class="['collapse navbar-collapse', { show: isCollapsed }]" id="navbarSupportedContent">
          <!-- Navbar brand -->
          <a class="navbar-brand mt-2 mt-lg-0" href="#">
            <ImageStyled
                imageUrl="../../images/logo.png"
                altText="Logo com nome do app Link to Food em vermelho"
                width="7.5rem"
      />
          </a>
          <!-- Left links -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Início</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pedidos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Produtos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Estatísticas</a>
            </li>
          </ul>
          <!-- Left links -->
        </div>
        <!-- Collapsible wrapper -->
  
        <!-- Right elements -->
        <div class="d-flex align-items-center">
          <!-- Icon -->
          <a class="link-secondary me-3" href="#">
            <i class="fas fa-shopping-cart"></i>
          </a>
  
          <!-- Notifications -->
          <div class="dropdown">
            <a
              class="link-secondary me-3 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
            >
              <i class="fas fa-bell"></i>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item" href="#">Some news</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">Another news</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </div>
          <!-- Avatar -->
          <div class="dropdown">
            <a
              class="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              aria-expanded="false"
            >
              <ImageStyled
                imageUrl="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                class="rounded-circle"
                height="2rem"
                alt="Black and White Portrait of a Man"
                
              />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a class="dropdown-item" href="#">My profile</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">Settings</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- Right elements -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </template>
  
  <style scoped>


  .navbar {
    background-color: var(--white);
  }
  
  .navbar-nav {
    display: flex;
    gap: 10px
  }
  
  .navbar-brand img {
    height: 15px;
  }
  
  .nav-link {
    color: var(--dark-gray);
    text-decoration: none;
  }
  
  .nav-link:hover {
    color: var(--red);
  }
  
  .navbar-toggler {
    border-color: var(--white);
  }
  
  .navbar-toggler .fas {
    color: var(--white);
  }
  
  .link-secondary {
    color: var(--white);
  }
  
  .link-secondary:hover {
    color: var(--dark-gray);
  }
  
  .badge-notification {
    background-color: var(--red);
  }
  
  .dropdown-menu {
    background-color: var(--white);
    color: var(--dark-blue);
  }
  
  .dropdown-item {
    color: var(--dark-blue);
    text-decoration: none;
  }
  
  .dropdown-item:hover {
    background-color: var(--dark-blue);
    color: var(--white);
  }
  
  .dropdown-toggle::after {
    display: none;
  }
  
  .rounded-circle {
    border: 2px solid var(--white);
  }

  .navbar-collapse {
    display: flex;
    justify-content: space-around;
  }
  </style>
  
  