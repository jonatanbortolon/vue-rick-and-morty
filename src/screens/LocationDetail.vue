<script lang="ts">
import { defineComponent } from 'vue';
import api from '../api';
import ErrorBanner from '../components/ErrorBanner.vue';
import ICharacter from '../types/character';
import ILocation from '../types/location';
import Loading from '../components/Loading.vue';

type IData = {
  location: ILocation | null;
  residents: Array<ICharacter>;
  loading: boolean;
  error: boolean
};

type ILocationResponse = ILocation;

type ICharacterResponse = ICharacter;

export default defineComponent({
  components: {
    ErrorBanner: ErrorBanner,
    Loading: Loading
  },
  data(): IData {
    return {
      location: null,
      residents: [],
      loading: true,
      error: false
    };
  },
  async mounted() {
    try {
      const locationId = this.$route.params.id;
      
      const locationResponse = await api.get<ILocationResponse>(`/location/${locationId}`);

      const resisentResponses = await Promise.all(locationResponse.data.residents.map(resident => api.get<ICharacterResponse>(resident)));
    
      this.location = locationResponse.data;
      this.residents = resisentResponses.map(residentResponse => residentResponse.data);
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
    
  }
});
</script>

<template>
  <div class="container">
    <Loading v-if="loading"/>
    <ErrorBanner v-if="error"/>
    <div class="location" v-if="!error && !loading && location">
      <img src=""/>
      <h1>{{ location.name }}</h1>
      <span>Type: {{ location.type }}</span>
      <span>Dimension: {{ location.dimension }}</span>
      <span>Episodes: 
        <span v-for="(resident, index) in residents">
          <router-link class="link" :to="{ name: 'character', params: { id: resident.id }}">{{ resident.name }}</router-link>{{ index === residents.length - 1 ? "" : ", " }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
  }

  .location {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .link {
    text-decoration: none;
    color: #3965bd;
    font-weight: 600;
  }
</style>