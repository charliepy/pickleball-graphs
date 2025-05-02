import { createRouter, createWebHashHistory } from 'vue-router';
import { ROUTES } from '@/router/pages.js';

const routes = [
  {
    path: '/',
    name: ROUTES.home,
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Pickleball Graphs' },
  },
  {
    path: '/pb-effect',
    name: ROUTES.pbeffect,
    component: () => import('@/views/PickleballEffect.vue'),
    meta: { title: 'Pickleball Effect' },
  },
  {
    path: '/johnkew-pb',
    name: ROUTES.johnkewpb,
    component: () => import('@/views/JohnkewPickleball.vue'),
    meta: { title: 'Johnkew Pickleball' },
  },
  {
    path: '/misc-stats',
    name: ROUTES.misc,
    component: () => import('@/views/MiscStats.vue'),
    meta: { title: 'Misc Stats' },
  },
  {
    path: '/pb-brackets',
    name: ROUTES.pbbrackets,
    component: () => import('@/views/PickleballBrackets.vue'),
    meta: { title: 'Pickleball Brackets' },
  },
  {
    path: '/pb-brackets/:id',
    name: ROUTES.details,
    component: () => import('@/views/EventDetails.vue'),
    meta: { title: 'Event Details' },
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Not Found' },
  },
];

const router = createRouter({
  history: createWebHashHistory('/pickleball-graphs'),
  routes,
});

router.afterEach(async (to) => {
  document.title = to.meta.title;
});

export default router;
