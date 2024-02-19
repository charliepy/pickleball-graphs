import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from '@/router';
import { plugin, defaultConfig } from '@formkit/vue';
import { faIcons, formkitConfig } from './theme.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Pinia Store
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

library.add(faIcons);

const app = createApp(App);
app.component('FontAwesome', FontAwesomeIcon);
app.use(plugin, defaultConfig(formkitConfig));
app.use(router);
app.use(pinia);
app.mount('#app');
