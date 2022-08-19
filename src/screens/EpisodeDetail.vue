<script lang="ts">
import { defineComponent } from 'vue';
import api from '../api';
import ICharacter from '../types/character';
import IEpisode from '../types/episode';
import ErrorBanner from '../components/ErrorBanner.vue';
import Loading from '../components/Loading.vue';

type IData = {
  episode: IEpisode | null;
  characters: Array<ICharacter>;
  loading: boolean;
  error: boolean
};

type IEpisodeResponse = IEpisode;

type ICharacterResponse = ICharacter;

export default defineComponent({
  components: {
    ErrorBanner: ErrorBanner,
    Loading: Loading
  },
  data(): IData {
      return {
          episode: null,
          characters: [],
          loading: true,
          error: false
      };
  },
  async mounted() {
      try {
          const characterId = this.$route.params.id;

          const episodeResponse = await api.get<IEpisodeResponse>(`/character/${characterId}`);

          const characterResponses = await Promise.all(episodeResponse.data.characters.map(character => api.get<ICharacterResponse>(character)));
          
          this.episode = episodeResponse.data;
          this.characters = characterResponses.map(characterResponse => characterResponse.data);
      }
      catch {
          this.error = true;
      }
      finally {
          this.loading = false;
      }
  },
});
</script>

<template>
  <div class="container">
    <Loading v-if="loading"/>
    <ErrorBanner v-if="error"/>
    <div class="episode" v-if="!error && !loading && episode">
      <h1>{{ episode.episode }} - {{ episode.name }}</h1>
      <span>Air date: {{ episode.air_date }}</span>
      <span>Characters: 
        <span v-for="(character, index) in characters">
          <router-link class="link" :to="{ name: 'character', params: { id: character.id }}">{{ character.name }}</router-link>{{ index === characters.length - 1 ? "" : ", " }}
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

  .episode {
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