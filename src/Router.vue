<script lang="ts">
  import { defineComponent } from "vue";
  import NavBarComponent from "./components/NavBar.vue"

  export default defineComponent({
    components: {
      NavBarComponent: NavBarComponent
    }
  });
</script>

<template>
  <NavBarComponent />
  <router-view></router-view>
</template>