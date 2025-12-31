<template>
  <BaseSidebar>
    <div class="mt-6 max-w-7xl mx-auto">
      <BaseDataTable>
        <template #table-header>
          <tr class="bg-gray-200">
            <th v-for="col in columns" :key="col" class="px-4 py-2 text-left">
              <p class="text-base font-semibold">{{ col }}</p>
            </th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="item in eventList" :key="item['id']">
            <td class="px-4 py-2">
              {{ item['dateFrom'] }}
            </td>
            <td class="px-4 py-2">
              <a
                class="text-blue-500 hover:underline"
                :href="`https://pickleballtournaments.com/tournaments/${item['id']}/events`"
                target="_blank">
                {{ item['title'] }}
              </a>
            </td>
            <td class="px-4 py-2">
              {{ item['registrationCount'] }}
            </td>
            <td class="px-4 py-2">
              {{ item['price'] }}
            </td>
            <td class="px-4 py-2">
              {{ item['location'] }}
            </td>
          </tr>
        </template>
      </BaseDataTable>
    </div>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import BaseDataTable from '@/components/BaseDataTable.vue';
import { onMounted } from 'vue';
import { ROUTES } from '@/router/pages.js';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';

const columns = ['Date', 'Title', 'Count', 'Price', 'Location'];

const router = useRouter();
const eventList = ref([]);

const goToEvent = (item) => {
  bracketStore.setEventTitle(item['Title']);

  router.push({
    name: ROUTES.details,
    params: { id: item['EventID'] },
  });
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://proxy.corsfix.com/?https://pickleballtournaments.com/api/getPPATournaments?currentPage=1`,
    );

    eventList.value = response.data.data.items;
  } catch (e) {
    console.error(e);
  }
});
</script>
