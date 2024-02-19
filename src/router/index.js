import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/pages.js';

const routes = [
  {
    path: '/pickleball-graphs',
    name: ROUTES.home,
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Pickleball Graphs' },
  },
  {
    path: '/pickleball-graphs/pb-effect',
    name: ROUTES.pbeffect,
    component: () => import('@/views/PickleballEffect.vue'),
    meta: { title: 'Pickleball Effect' },
  },
  {
    path: '/pickleball-graphs/johnkew-pb',
    name: ROUTES.johnkewpb,
    component: () => import('@/views/JohnkewPickleball.vue'),
    meta: { title: 'Johnkew Pickleball' },
  },
  {
    path: '/pickleball-graphs/pb-brackets',
    name: ROUTES.pbbrackets,
    component: () => import('@/views/PickleballBrackets.vue'),
    meta: { title: 'Pickleball Brackets' },
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(async (to) => {
  document.title = to.meta.title;
});

export default router;
