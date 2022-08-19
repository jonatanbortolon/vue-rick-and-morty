import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import './style.css'

import Router from './Router.vue'
import HomeScreen from './screens/Home.vue'
import CharactersScreen from './screens/Characters.vue'
import CharacterDetailScreen from './screens/CharacterDetail.vue'
import LocationsScreen from './screens/Locations.vue'
import LocationDetailScreen from './screens/LocationDetail.vue'
import EpisodesScreen from './screens/Episodes.vue'
import EpisodeDetailScreen from './screens/EpisodeDetail.vue'

const routes = [
  { name: "home", path: '/', component: HomeScreen },
  { name: "characters", path: '/characters', component: CharactersScreen },
  { name: "character", path: '/characters/:id', component: CharacterDetailScreen },
  { name: "locations", path: '/locations', component: LocationsScreen },
  { name: "location", path: '/locations/:id', component: LocationDetailScreen },
  { name: "episodes", path: '/episodes', component: EpisodesScreen },
  { name: "episode", path: '/episodes/:id', component: EpisodeDetailScreen }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

createApp(Router)
  .use(router)
  .mount('#app');
