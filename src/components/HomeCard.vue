<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
});
</script>

<template>
  <div class="card">
    <img class="image" :src="image"/>
    <div class="name-wrapper"><span class="name">{{ name }}</span> <router-link class="link" :to="{name: route }">&#x1F6C8;</router-link></div>
  </div>
</template>

<style scoped>
  .card {
    width: 200px;
    height: 240px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #242424;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  .image {
    max-width: 100%;
    border-radius: 4px 4px 0 0;
    margin-bottom: 10px;
  }

  .name-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    padding: 0 15px;
    gap: 5px;
  }

  .name {
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .link {
    text-decoration: none;
    color: #3965bd;
    font-weight: 600;
  }
</style>