<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <nav class="nav">
    <router-link class="logo" :to="{ name: 'home' }">
      <img src="../assets/logo.png"/>
    </router-link>
    <div class="links">
      <router-link class="link" :to="{ name: 'characters' }">Characters</router-link>
      <router-link class="link" :to="{ name: 'locations' }">Locations</router-link>
      <router-link class="link" :to="{ name: 'episodes' }">Episodes</router-link>
    </div>
  </nav>
</template>

<style scoped>
  .nav {
    width: 100%;
    height: 80px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #323232;
    box-shadow: 0px 6px 13px -9px rgba(0,0,0,0.69);
  }

  .logo {
    width: auto;
    height: 100%;
    cursor: pointer;
  }

  .logo img {
    height: 100%;
  }

  .links {
    width: min-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .link {
    color: #8dc453;
    font-weight: 600;
    text-decoration: none;
  }
</style>