<script lang="ts">
import { defineComponent } from "vue";
import type IEpisode from "../types/episode";
import api from "../api"
import EpisodeCard from "../components/EpisodeCard.vue";
import ErrorBanner from "../components/ErrorBanner.vue";
import Loading from "../components/Loading.vue";

type IData = {
  episodes: Array<IEpisode>;
  error: boolean;
  loading: boolean;
  next: boolean;
  prev: boolean
};

type IEpisodesResponse = {
  info: {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null
  },
  results: Array<IEpisode>
}

export default defineComponent({
  components: {
    EpisodeCard: EpisodeCard,
    ErrorBanner: ErrorBanner,
    Loading: Loading
  },
  data(): IData {
    return {
      episodes: new Array(),
      error: false,
      loading: true,
      next: false,
      prev: false
    };
  },
  methods: {
    async fetchData(page: number) {
      try {
        this.error = false;
        this.loading = true;

        const episodesResponse = await api.get<IEpisodesResponse>(`/episode?page=${page}`);
      
        this.episodes = episodesResponse.data.results;
        this.prev = !!episodesResponse.data.info.prev;
        this.next = !!episodesResponse.data.info.next;
        
      } catch {
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    const page = this.$route.query.page ? Number(this.$route.query.page) : 1;
    
    await this.fetchData(page);
  },
  watch: {
    async "$route.query.page"(page) {
      await this.fetchData(page);
    }
  }
});
</script>

<template>
  <div class="container">
    <h1 class="title">Episodes</h1>
    <Loading v-if="loading"/>
    <ErrorBanner v-if="error"/>
    <div class="list" v-if="!error && !loading">
      <EpisodeCard v-for="episode in episodes"
        :key="episode.id"
        :id="episode.id"
        :name="episode.name"
        :episode="episode.episode"/>
    </div>
    <div v-if="!error && !loading" class="navigation-buttons">
      <router-link class="navigation-button" v-if="prev" :to="{ name: 'episodes', query: { page: ($route.query.page ? Number($route.query.page) : 1) - 1 } }">&larr; Previous</router-link>
      <router-link class="navigation-button" v-if="next" :to="{ name: 'episodes', query: { page: ($route.query.page ? Number($route.query.page) : 1) + 1 } }">Next &rarr;</router-link>
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

  .title {
    margin: 25px 0;
  }

  .list {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px 0;
    margin-bottom: 10px;
  }

  .navigation-buttons {
    display: flex;
    gap: 15px;
  }

  .navigation-button {
    width: 150px;
    text-align: center;
    border-radius: 4px;
    padding: 10px;
    color: white;
    text-decoration: none;
    font-weight: 600;
    background-color: #8dc453;
  }
</style>