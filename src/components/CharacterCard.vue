<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type ICharacter from "../types/character"

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    origin: {
      type: Object as PropType<ICharacter["origin"]>,
      required: true
    },
    specie: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  }
});
</script>

<template>
  <div class="card">
    <img class="image" :src="image"/>
    <span class="name">{{ name }} <router-link class="link" :to="{ name: 'character', params: { id: id } }">&#x1F6C8;</router-link></span>
    <div class="infos">
      <span>Origin: 
        <span v-if="origin.url === ''">????</span>
        <router-link class="link" v-if="origin.url !== ''" :to="{ name: 'location', params: { id: origin.url.split('/')[origin.url.split('/').length - 1] } }">{{ origin.name }}</router-link>
      </span>
      <span>Specie: {{ specie }}</span>
      <span>Gender: {{ gender }}</span>
    </div>
  </div>
</template>

<style scoped>
  .card {
    width: 200px;
    height: 350px;
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

  .name {
    text-align: center;
    font-weight: 700;
    padding: 0 15px;
  }

  .infos {
    margin-top: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 500;
    padding: 0 15px 15px 15px;
  }

  .infos span {
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link {
    text-decoration: none;
    color: #3965bd;
    font-weight: 600;
  }
</style>