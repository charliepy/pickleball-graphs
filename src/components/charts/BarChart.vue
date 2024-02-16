<template>
  <div>
    <Bar
      class="h-[50vh] w-[80vw] lg:w-[60vw] lg:h-[70vh]"
      :data="chartData"
      :options="chartOptions"
      :style="{
        position: 'relative',
      }" />
  </div>
</template>

<script setup>
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    required: true,
  },
});
</script>
