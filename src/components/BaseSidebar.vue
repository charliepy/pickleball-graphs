<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <nav class="navbar w-full lg:hidden">
        <div class="flex flex-1 md:gap-1 lg:gap-2">
          <span
            class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
            data-tip="Menu">
            <label
              aria-label="Open menu"
              for="my-drawer"
              class="btn btn-square btn-ghost drawer-button lg:hidden">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </span>
          <div class="flex items-center gap-2 lg:hidden">Pickleball Graphs</div>
        </div>
      </nav>

      <!-- Page content here -->
      <div class="px-6 pb-16 min-h-screen max-w-7xl mx-auto">
        <slot></slot>
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"></label>
      <ul
        class="menu menu-lg p-4 w-80 min-h-full bg-base-200 text-base-content border-r-2 border-gray-300">
        <!-- Sidebar content here -->
        <li>
          <router-link
            :to="{ name: ROUTES.home }"
            :class="{ active: route.name === ROUTES.home }">
            <div class="flex gap-x-2">
              <img class="h-8" src="/favicon.ico" />
              Home
            </div>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: ROUTES.pbeffect }"
            :class="{ active: route.name === ROUTES.pbeffect }">
            <div class="flex gap-x-2">
              <img class="h-8" src="/src/assets/PE-Logo.png" />
              PickleBall Effect
            </div>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: ROUTES.johnkewpb }"
            :class="{ active: route.name === ROUTES.johnkewpb }">
            <div class="flex gap-x-2">
              <img class="h-8" src="/src/assets/Johnkew-Logo.png" />
              Johnkew Pickleball
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ROUTES } from '@/router/pages.js';

const route = useRoute();
</script>
