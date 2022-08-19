<script lang="ts">
import { defineComponent } from 'vue';
import api from '../api';
import ErrorBanner from '../components/ErrorBanner.vue';
import ICharacter from '../types/character';
import IEpisode from '../types/episode';
import Loading from '../components/Loading.vue';

type IData = {
  character: ICharacter | null;
  episodes: Array<IEpisode>;
  loading: boolean;
  error: boolean
};

type ICharacterResponse = ICharacter;

type IEpisodeResponse = IEpisode;

export default defineComponent({
  components: {
    ErrorBanner: ErrorBanner,
    Loading: Loading
  },
  data(): IData {
    return {
      character: null,
      episodes: [],
      loading: true,
      error: false
    };
  },
  async mounted() {
    try {
      const characterId = this.$route.params.id;
      
      const characterResponse = await api.get<ICharacterResponse>(`/character/${characterId}`);

      const episodeResponses = await Promise.all(characterResponse.data.episode.map(episode => api.get<IEpisodeResponse>(episode)));
    
      this.character = characterResponse.data;
      this.episodes = episodeResponses.map(episodeResponse => episodeResponse.data);
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
    <div class="character" v-if="!error && !loading && character">
      <img :src="character.image"/>
      <h1>{{ character.name }}</h1>
      <span>Status: {{ character.status }}</span>
      <span>Specie: {{ character.species }}</span>
      <span>Gender: {{ character.gender }}</span>
      <span>Type: {{ character.type ? character.type : "????" }}</span>
      <span>Origin: <router-link class="link" :to="{ name: 'location', params: { id: character.origin.url.split('/')[character.origin.url.split('/').length - 1] } }">{{ character.origin.name }}</router-link></span>
      <span>Location: <router-link class="link" :to="{ name: 'location', params: { id: character.location.url.split('/')[character.location.url.split('/').length - 1] } }">{{ character.location.name }}</router-link></span>
      <span>Episodes: 
        <span v-for="(episode, index) in episodes">
          <router-link class="link" :to="{ name: 'episode', params: { id: episode.id }}">{{ episode.name }}</router-link>{{ index === character.episode.length - 1 ? "" : ", " }}
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

  .character {
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