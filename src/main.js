import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from '@/router';
import { plugin, defaultConfig } from '@formkit/vue';
import { formkitConfig } from './theme.js';

// Pinia Store
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(plugin, defaultConfig(formkitConfig));
app.use(router);
app.use(pinia);
app.mount('#app');
