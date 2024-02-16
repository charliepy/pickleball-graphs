<template>
  <BaseSidebar>
    <PaddleChart
      :paddle-order="paddleOrder"
      :paddle-menu="paddleMenu"
      :paddle-data="paddleData" />
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import csv from '@/assets/stats/JohnkewPickleball.csv';
import PaddleChart from '@/components/charts/PaddleChart.vue';

const paddleData = csv.filter((item) => {
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
