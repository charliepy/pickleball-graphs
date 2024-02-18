<template>
  <BaseSidebar>
    <article class="prose lg:prose-xl max-w-full">
      <div class="flex flex-col items-center">
        <h2>Pickleball Graphs</h2>
        <h3>Powered By:</h3>
        <img class="h-40 lg:h-48" src="/src/assets/chart-js-logo.png" alt="chart.js logo" />
        <h4>Last updated: {{ LAST_UPDATE }}</h4>
      </div>

      <p>The graphs generated here come from The Big 3 pickleball reviewers</p>
      <ul>
        <li>
          <a
            class="text-blue-500 hover:underline active:text-yellow-400"
            href="https://thepickleballstudio.notion.site/5bdf3ee752c940eba864a81bc3281164?v=a5170d43e5ab4573b18f48c363cce7ec">
            Pickleball Studio
          </a>
        </li>
        <li>
          <a
            class="text-blue-500 hover:underline active:text-yellow-400"
            href="https://pickleballeffect.com/pickleball-paddle-database">
            Pickleball Effect
          </a>
        </li>
        <li>
          <a
            class="text-blue-500 hover:underline active:text-yellow-400"
            href="https://www.johnkewpickleball.com/paddle-database">
            Johnkew Pickleball
          </a>
        </li>
      </ul>

      <div class="h-4"></div>

      <p>Some important terms</p>

      <div class="flex flex-col gap-2">
        <div class="collapse collapse-plus bg-gray-100">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Swing weight</div>
          <div class="collapse-content">
            <p>How "heavy" the paddle feels when you swing it</p>
            <ul class="list-none">
              <li>
                <span class="font-bold"><100</span> VERY low swing weight and
                the paddle will feel extremely fast in hand
              </li>
              <li>
                <span class="font-bold">100-110</span> still very fast in the
                hand and where most standard paddle shapes average
              </li>
              <li>
                <span class="font-bold">110-120</span> is where a lot of
                elongated paddles average. Once you pass about 115, that’s when
                you may start to notice a small compromise in hand speed
              </li>
              <li>
                <span class="font-bold">120+</span> These paddle will feel quite
                slow in the hand
              </li>
            </ul>
            <p>
              NOTE: Two paddles may have the same static weight but feel very
              different due to swing weight
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-gray-100">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Twist weight</div>
          <div class="collapse-content">
            <p>How much the paddle resists twisting to off center hits</p>
            <p>
              This measurement is loosely correlated to the amount of
              forgiveness or the size of the sweet spot of the paddle
            </p>
            <p>
              NOTE: There are cases where a paddle has a lower twist weight yet
              the sweet spot "feels" large
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-gray-100">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Power</div>
          <div class="collapse-content">
            <p>
              How fast the ball travels from a full swing. Full swings involve
              serves and drives
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-gray-100">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Pop</div>
          <div class="collapse-content">
            <p>
              How fast the ball travels from a punch volley such as when
              countering a shot
            </p>
            <p>
              Poppier paddles will have better counters. However, it will be
              harder to keep the ball from floating or popping up when resetting
              or dinking
            </p>
          </div>
        </div>
      </div>
    </article>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import { LAST_UPDATE } from '../utils/utils.js';
</script>
