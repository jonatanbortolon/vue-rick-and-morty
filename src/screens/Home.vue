<script lang="ts">
import { defineComponent } from "vue";
import HomeCard from "../components/HomeCard.vue";

import CharactersImage from "../assets/characters.jpg"
import LocationsImage from "../assets/locations.jpg"
import EpisodesImage from "../assets/episodes.jpg"

export default defineComponent({
  components: {
    HomeCard: HomeCard
  },
  data() {
    return {
      CharactersImage: CharactersImage,
      LocationsImage: LocationsImage,
      EpisodesImage: EpisodesImage
    };
  }
});
</script>

<template>
  <div class="container">
    <div class="list">
      <HomeCard v-for="route in [{ name: 'characters', image: CharactersImage }, { name: 'locations', image: LocationsImage }, { name: 'episodes', image: EpisodesImage }]" :name="route.name" :route="route.name" :image="route.image"/>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
  }

  .list {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px 0;
    margin-bottom: 10px;
  }
</style>