<template>
  <BaseSidebar>
    <div class="mt-6 max-w-7xl mx-auto">
      <button class="btn btn-info mb-2" @click="refreshList">Refresh</button>
      <BaseDataTable>
        <template #table-header>
          <tr class="bg-gray-200">
            <th v-for="col in columns" :key="col" class="px-4 py-2 text-left">
              <p class="text-base font-semibold">{{ col }}</p>
            </th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="item in store.getPaginatedData(dataId)" :key="item['id']">
            <td class="px-4 py-2">
              {{ format(parseISO(item['dateFrom']), 'MM/dd/yyyy') }}
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
import { onMounted, onUnmounted } from 'vue';
import { useBracketStore } from '@/api/bracket.js';
import { useStore } from '@/utils/store.js';
import { format, parseISO } from 'date-fns';

const columns = ['Date', 'Title', 'Count', 'Price', 'Location'];

const bracketStore = useBracketStore();
const store = useStore();
const dataId = store.initializeData(100);

const refreshList = async () => {
  store.resetData(dataId);
  const eventList = await bracketStore.getProEvents();
  if (eventList.length) {
    store.addAllData(dataId, eventList);
  }
};

onMounted(async () => {
  const result = bracketStore.getSavedProResult();
  if (result.length) {
    store.addAllData(dataId, result);
  }
});

onUnmounted(() => {
  store.deleteKey(dataId);
});
</script>
