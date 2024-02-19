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
import csv from '@/assets/stats/JohnkewPickleball.csv';
import PaddleChart from '@/components/charts/PaddleChart.vue';
import { each } from 'lodash-es';

const cleanData = each(csv, (o) => each(o, (v, k) => (o[k] = v.trim())));

const paddleData = cleanData.filter((item) => {
  return item['Power Percentile'] && item['Pop Percentile'];
});

const paddleMenu = [
  {
    title: 'Power',
    key: 'Serve Speed-MPH (Power)',
    percentile: 'Power Percentile',
  },
  {
    title: 'Pop',
    key: 'Punch Volley Speed-MPH (Pop)',
    percentile: 'Pop Percentile',
  },
  {
    title: 'Swing Weight',
    key: 'Swing Weight',
    percentile: 'Swing Weight Percentile',
  },
  {
    title: 'Twist Weight',
    key: 'Twist Weight',
    percentile: 'Twist Weight Percentile',
  },
];

const paddleOrder = [0, 1];
</script>
