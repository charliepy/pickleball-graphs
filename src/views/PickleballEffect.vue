<template>
  <BaseSidebar>
    <div class="mt-4 flex flex-col items-center">
      <div class="flex gap-4">
        <div>
          <p class="mx-2 font-medium">Sort By</p>
          <ul class="menu menu-vertical md:menu-horizontal bg-base-200 rounded-box">
            <li v-for="(item, index) in paddleMenu" :key="item">
              <a
                :class="{
                  active: item.title === paddleMenu[currentMenuIndex].title,
                }"
                @click="changeSort(index)">
                {{ paddleMenu[index].title }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="mx-2 font-medium">Direction</p>
          <ul class="menu menu-vertical md:menu-horizontal bg-base-200 rounded-box">
            <li>
              <a :class="{ active: isAscending }" @click="changeDirection(0)">
                Ascending
              </a>
            </li>
            <li>
              <a :class="{ active: !isAscending }" @click="changeDirection(1)">
                Descending
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="breadcrumbs mt-6 mb-2">
        <ul>
          <li v-for="(item, level) in breadcrumbs" :key="item">
            <a
              class="text-blue-500"
              :class="{ 'font-semibold': level === breadcrumbs.length - 1 }"
              @click="actionHandler(level)">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
      <div v-if="currentChartLevel === 0">
        <div v-if="showChart">
          <BarChart :chart-data="chartData" :chart-options="chartOptions" />
          <div class="mt-2">
            <PaginationButton :data-id="dataId" />
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="showChart">
          <div class="max-w-lg md:max-w-2xl lg:max-w-6xl mb-4 mx-auto">
            <BaseDataTable>
              <template #table-header>
                <tr class="bg-gray-200">
                  <th
                    v-for="col in Object.keys(currentPaddle)"
                    :key="col"
                    class="px-4 py-2 text-left">
                    <p class="text-base font-semibold">{{ col }}</p>
                  </th>
                </tr>
              </template>
              <template #table-body>
                <tr>
                  <td
                    v-for="col in Object.keys(currentPaddle)"
                    :key="col"
                    class="px-4 py-2">
                    {{ currentPaddle[col] }}
                  </td>
                </tr>
              </template>
            </BaseDataTable>
          </div>
        </div>

        <div class="max-w-lg md:max-w-4xl mx-auto">
          <RadarChart
            :chart-data="radarData"
            :chart-options="initialRadarChartOptions()" />
        </div>
      </div>
    </div>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import RadarChart from '@/components/charts/RadarChart.vue';
import {
  CHART_BACKGROUNDS,
  CHART_COLORS,
  initialBarChartOptions,
  initialRadarChartOptions,
} from '@/utils/utils.js';
import { useStore } from '@/utils/store.js';
import { computed, nextTick, onMounted, ref } from 'vue';
import { isNil, orderBy } from 'lodash-es';
import PaginationButton from '@/components/pagination/PaginationButton.vue';
import BarChart from '@/components/charts/BarChart.vue';
import csv from '@/assets/stats/PickleballEffect.csv';
import BaseDataTable from '@/components/BaseDataTable.vue';

const paddleData = csv.filter((item) => {
  return item['Power Percentile'] && item['Pop Percentile'];
});

const paddleMenu = [
  { title: 'Power', key: 'Power (MPH)' },
  { title: 'Pop', key: 'Pop (MPH)' },
  { title: 'Swing Weight', key: 'Swingweight' },
  { title: 'Twist Weight', key: 'Twistweight' },
];

const currentMenuIndex = ref(0);
const currentChartLevel = ref(0);
const currentPaddle = ref({});
const currentChartKey = ref('');
const chartLevelData = ref({});
const breadcrumbs = ref([]);
const radarData = ref({});
const showChart = ref(false);
const isAscending = ref(false);

const store = useStore();
const dataId = store.initializeData();

const chartData = computed(() => {
  const dataList = store.getPaginatedData(dataId);
  return getChartDataSet(dataList);
});

const chartOptions = initialBarChartOptions();
chartOptions.onClick = async (event) => {
  const element = event.chart.getElementsAtEventForMode(
    event,
    'nearest',
    { intersect: true },
    true,
  );

  let index = 0;
  if (element?.length) {
    const currentPage = store.getDataMap(dataId).currentPage - 1;
    const pageSize = store.getPageSize(dataId);
    const offset = element[0].index;
    index = currentPage * pageSize + offset;
    await actionHandler(currentChartLevel.value + 1, index);
  }
};

const actionHandler = async (level, index = null) => {
  showChart.value = false;
  currentChartLevel.value = level;

  switch (level) {
    case 0:
      getAllPaddlesChart(index);
      break;
    case 1:
      getPaddleStatChart(index);
      break;
    default:
      currentChartLevel.value = level - 1;
  }

  await nextTick();
  showChart.value = true;
};

const getChartData = (index = null) => {
  if (currentChartLevel.value === 0) {
    currentChartKey.value = 'Paddle List';
  } else if (isNil(index)) {
    currentChartKey.value = breadcrumbs.value[currentChartLevel.value].name;
  } else {
    currentChartKey.value =
      breadcrumbs.value[currentChartLevel.value - 1].labels[index].label;
  }

  let paddles;
  if (currentChartLevel.value === 0) {
    paddles = paddleData;
  } else {
    paddles =
      chartLevelData.value[currentChartLevel.value - 1][currentChartKey.value];
  }
  return paddles;
};

const processChartData = (data, index = null) => {
  const dataList = [];
  for (const [key, value] of Object.entries(data)) {
    dataList.push({
      label: key,
      count: value[paddleMenu[currentMenuIndex.value].key],
    });
  }

  const order = isAscending.value ? ['asc'] : ['desc'];
  const sortedList = orderBy(dataList, ['count'], order);

  store.resetData(dataId);
  window.innerWidth > 1024
    ? store.setPageSize(dataId, 20)
    : store.setPageSize(dataId, 10);
  store.addAllData(dataId, sortedList);

  if (isNil(index)) {
    if (currentChartLevel.value === 0) {
      breadcrumbs.value = [
        {
          name: currentChartKey.value,
          labels: sortedList,
        },
      ];
    } else {
      breadcrumbs.value = breadcrumbs.value.slice(
        0,
        currentChartLevel.value + 1,
      );
    }
  } else {
    breadcrumbs.value.push({
      name: currentChartKey.value,
      labels: sortedList,
    });
  }
};

const getChartDataSet = (pagedList) => {
  const chart = {
    labels: [],
    datasets: [],
  };
  const dataset = {
    backgroundColor: new Array(pagedList.length).fill(CHART_COLORS.blue),
    data: [],
  };
  pagedList.forEach((item) => {
    chart.labels.push(item.label);
    dataset.data.push(item.count);
  });
  chart.datasets.push(dataset);

  return chart;
};

const getAllPaddlesChart = (index) => {
  const paddles = getChartData(index);
  const data = {};
  paddles.forEach((paddle) => {
    const id = `${paddle[Object.keys(paddle)[1]]} ${paddle[Object.keys(paddle)[0]]}`;
    data[id] = paddle;
  });
  chartLevelData.value[currentChartLevel.value] = data;

  processChartData(data, index);
};

const getPaddleStatChart = (index) => {
  const paddle = getChartData(index);
  currentPaddle.value = paddle;

  processChartData([paddle], index);

  const data = [];
  data.push(paddle['Power Percentile'].replace('%', ''));
  data.push(paddle['Pop Percentile'].replace('%', ''));
  data.push(paddle['Twistweight Percentile'].replace('%', ''));
  data.push(paddle['Swingweight Percentile'].replace('%', ''));

  radarData.value = {
    labels: ['Power', 'Pop', 'Twist Weight', 'Swing Weight'],
    datasets: [
      {
        label: `${paddle[Object.keys(paddle)[1]]} ${paddle[Object.keys(paddle)[0]]}`,
        backgroundColor: CHART_BACKGROUNDS.red,
        borderColor: CHART_COLORS.red,
        pointBackgroundColor: CHART_COLORS.red,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: CHART_COLORS.red,
        data: data,
      },
    ],
  };
};

const changeSort = async (index) => {
  currentMenuIndex.value = index;
  chartOptions.plugins.title.text[0] = paddleMenu[index].key;
  await actionHandler(0);
};

const changeDirection = async (index) => {
  if (isAscending.value && index === 0) {
    return;
  }
  if (!isAscending.value && index === 1) {
    return;
  }
  isAscending.value = !isAscending.value;
  await actionHandler(0);
};

onMounted(async () => {
  chartOptions.plugins.title.text[0] = paddleMenu[0].key;
  await actionHandler(0);
});
</script>
