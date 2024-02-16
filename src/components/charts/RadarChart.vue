<template>
  <Radar
    class="h-[400px] w-[400px] md:h-[80vh] md:w-[80vw]"
    :data="chartData"
    :options="chartOptions"
    :style="{
      position: 'relative',
    }" />
</template>

<script setup>
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'vue-chartjs';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
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
