<template>
  <BaseSidebar>
    <div class="max-w-7xl mx-auto">
      <PaddleChart
        :paddle-order="paddleOrder"
        :paddle-menu="paddleMenu"
        :paddle-data="paddleData" />
    </div>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import csv from '@/assets/stats/PickleballEffect.csv';
import PaddleChart from '@/components/charts/PaddleChart.vue';
import { each } from 'lodash-es';

const cleanData = each(csv, (o) => each(o, (v, k) => (o[k] = v.trim())));

const paddleData = cleanData.filter((item) => {
  return item['Power Percentile'] && item['Pop Percentile'];
});

const paddleMenu = [
  {
    title: 'Power',
    key: 'Power (MPH)',
    percentile: 'Power Percentile',
  },
  {
    title: 'Pop',
    key: 'Pop (MPH)',
    percentile: 'Pop Percentile',
  },
  {
    title: 'Swing Weight',
    key: 'Swingweight',
    percentile: 'Swingweight Percentile',
  },
  {
    title: 'Twist Weight',
    key: 'Twistweight',
    percentile: 'Twistweight Percentile',
  },
];

const paddleOrder = [1, 0];
</script>
