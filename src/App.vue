<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router'
  import MenuStyled from './components/MenuStyled.vue';
  import { computed } from 'vue';

  const route = useRoute();

  const hiddenNavRoutes = ['welcome', 'signIn', 'signUp', 'rememberPassword'];

const showNavbar = computed(() => {
  const routeName = route.name;
  return typeof routeName === 'string' && !hiddenNavRoutes.includes(routeName);
});
</script>

<template>
  <MenuStyled v-if="showNavbar" />
  <RouterView />
</template>

