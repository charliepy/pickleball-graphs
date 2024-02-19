<template>
  <div class="mt-4 flex flex-col items-center">
    <div class="flex gap-4 mb-2">
      <div>
        <p class="pt-0 pb-2 label font-medium">Select Brand</p>
        <FormKit
          type="select"
          name="paddle"
          :options="selectPaddleOptions"
          @change="changePaddle($event)" />
      </div>

      <div>
        <p class="py-0 label font-medium">Sort By</p>
        <ul
          class="menu menu-vertical md:menu-horizontal bg-base-200 rounded-box">
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
        <p class="py-0 label font-medium">Direction</p>
        <ul
          class="menu menu-vertical md:menu-horizontal bg-base-200 rounded-box">
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

    <div v-if="currentChartLevel > 0" class="breadcrumbs mb-2">
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
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
      <div class="mt-2">
        <PaginationButton :data-id="dataId" />
      </div>
    </div>

    <div v-else>
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

      <div class="max-w-lg md:max-w-4xl mx-auto">
        <RadarChart
          :chart-data="radarData"
          :chart-options="initialRadarChartOptions()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import RadarChart from '@/components/charts/RadarChart.vue';
import {
  CHART_BACKGROUNDS,
  CHART_COLORS,
  initialBarChartOptions,
  initialRadarChartOptions,
} from '@/utils/utils.js';
import { useStore } from '@/utils/store.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { isNil, orderBy } from 'lodash-es';
import PaginationButton from '@/components/pagination/PaginationButton.vue';
import BarChart from '@/components/charts/BarChart.vue';
import BaseDataTable from '@/components/BaseDataTable.vue';

const props = defineProps({
  paddleData: { type: Object, required: true },
  paddleMenu: { type: Object, required: true },
  paddleOrder: { type: Object, required: true },
});

const currentMenuIndex = ref(0);
const currentChartLevel = ref(0);
const currentPaddle = ref({});
const currentChartKey = ref('');
const chartLevelData = ref({});
const filteredPaddles = ref([...props.paddleData]);
const breadcrumbs = ref([]);
const radarData = ref({});
const isAscending = ref(false);

const store = useStore();
const dataId = store.initializeData();

const selectPaddleOptions = computed(() => {
  const menu = props.paddleData.map((item) => {
    return item[Object.keys(item)[props.paddleOrder[0]]];
  });
  const uniqueMenu = new Set(menu.sort());
  return ['All', ...uniqueMenu];
});

const chartData = computed(() => {
  const dataList = store.getPaginatedData(dataId);
  return getChartDataSet(dataList);
});

const chartOptions = initialBarChartOptions();
chartOptions.onClick = (event) => {
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
    actionHandler(currentChartLevel.value + 1, index);
  }
};

const actionHandler = (level, index = null) => {
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
    paddles = filteredPaddles.value;
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
      count: Number(value[props.paddleMenu[currentMenuIndex.value].key]),
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
    const id = getLabel(paddle);
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
  const power = paddle[props.paddleMenu[0].percentile].replace('%', '');
  const pop = paddle[props.paddleMenu[1].percentile].replace('%', '');
  const swingweight = paddle[props.paddleMenu[2].percentile].replace('%', '');
  const twistweight = paddle[props.paddleMenu[3].percentile].replace('%', '');

  data.push(power);
  data.push(pop);
  data.push(twistweight);
  data.push(swingweight);

  radarData.value = {
    labels: ['Power', 'Pop', 'Twist Weight', 'Swing Weight'],
    datasets: [
      {
        label: getLabel(paddle),
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

const getLabel = (paddle) => {
  const brand = paddle[Object.keys(paddle)[props.paddleOrder[0]]];
  const name = paddle[Object.keys(paddle)[props.paddleOrder[1]]];

  return `${brand} ${name}`;
};

const changePaddle = (event) => {
  const value = event.target.value;
  const fullPaddleList = [...props.paddleData];
  if (value === 'All') {
    filteredPaddles.value = fullPaddleList;
  } else {
    filteredPaddles.value = fullPaddleList.filter((item) => {
      return item[Object.keys(item)[props.paddleOrder[0]]] === value;
    });
  }
  actionHandler(0);
};

const changeSort = (index) => {
  currentMenuIndex.value = index;
  chartOptions.plugins.title.text[0] = props.paddleMenu[index].key;

  if (index === 0) {
    chartOptions.scales.x.ticks.precision = 1;
  } else if (index === 1) {
    chartOptions.scales.x.ticks.precision = 1;
  }
  if (index === 2) {
    chartOptions.scales.x.ticks.precision = 0;
  } else if (index === 3) {
    chartOptions.scales.x.ticks.precision = 1;
  }

  actionHandler(0);
};

const changeDirection = (index) => {
  if (isAscending.value && index === 0) {
    return;
  }
  if (!isAscending.value && index === 1) {
    return;
  }
  isAscending.value = !isAscending.value;
  actionHandler(0);
};

onMounted(() => {
  chartOptions.plugins.title.text[0] = props.paddleMenu[0].key;
  actionHandler(0);
});

onUnmounted(() => {
  store.deleteKey(dataId);
})
</script>
