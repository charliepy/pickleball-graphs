<template>
  <BaseSidebar>
    <div class="mt-6 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="min-w-52">
          <button class="btn btn-accent mb-2 w-full" @click="clearForm">
            Clear All
          </button>
          <FormKit
            id="state-form"
            #default="{ disabled }"
            type="form"
            :actions="false"
            @submit="submitForm">
            <FormKit
              class="self"
              id="state-checkbox"
              name="states"
              type="checkbox"
              label="States"
              :options="bracketStore.getStateNames()"
              inner-class="h-8"
              options-class="max-h-[70vh] overflow-y-auto"
              help="Select none to search all states" />
            <FormKit
              type="submit"
              input-class="w-full justify-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none"
              :disabled="disabled"
              @click="triggerSubmit">
              <template #prefix>
                <FontAwesome
                  v-if="disabled"
                  :icon="['fas', 'spinner']"
                  class="fa-spin-pulse mr-2 h-6 w-6 text-white" />
              </template>
            </FormKit>
          </FormKit>
        </div>
        <div>
          <BaseDataTable>
            <template #table-header>
              <tr class="bg-gray-200">
                <th
                  v-for="col in columns"
                  :key="col"
                  class="px-4 py-2 text-left">
                  <p class="text-base font-semibold">{{ col }}</p>
                </th>
              </tr>
            </template>
            <template #table-body>
              <tr
                v-for="item in store.getPaginatedData(dataId)"
                :key="item['EventID']">
                <td class="px-4 py-2">
                  {{ item['EventActivityFirstDate'] }}
                </td>
                <td class="px-4 py-2">
                  {{ item['Title'] }}
                </td>
                <td class="px-4 py-2">
                  {{ item['RegistrationCount_InAtLeastOneLiveEvent'] }}
                </td>
                <td class="px-4 py-2">
                  {{ item['LocationOfEvent_Venue'] }}
                </td>
                <td class="px-4 py-2">
                  {{ item['LocationOfEvent_City'] }}
                </td>
                <td class="px-4 py-2">
                  {{ item['LocationOfEvent_StateTitle'] }}
                </td>
                <td class="px-4 py-2">
                  {{ item['IsPrizeMoney'] ? 'Yes' : 'No' }}
                </td>
                <td class="px-4 py-2">
                  {{ item['Sanction_USAPA'] ? 'Yes' : 'No' }}
                </td>
              </tr>
            </template>
          </BaseDataTable>
          <div class="mt-2">
            <PaginationButton :data-id="dataId" />
          </div>
        </div>
      </div>
    </div>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import { useBracketStore } from '@/api/bracket.js';
import { getNode } from '@formkit/core';
import BaseDataTable from '@/components/BaseDataTable.vue';
import PaginationButton from '@/components/pagination/PaginationButton.vue';
import { useStore } from '@/utils/store.js';
import { onMounted, onUnmounted } from 'vue';

const columns = [
  'Date',
  'Title',
  'Count',
  'Venue',
  'City',
  'State',
  'Prize Money',
  'USAPA Sanctioned',
];

const bracketStore = useBracketStore();
const store = useStore();
const dataId = store.initializeData();

const clearForm = async () => {
  await getNode('state-checkbox').input([]);
};

const triggerSubmit = () => {
  getNode('state-form').submit();
};

const submitForm = async (data) => {
  store.resetData(dataId);
  const eventList = await bracketStore.postEventSearch(data.states);
  if (eventList.length) {
    store.addAllData(dataId, eventList);
  }
};

onMounted(async () => {
  await getNode('state-checkbox').input(bracketStore.getSavedStates());

  const result = bracketStore.getSavedResult();
  if (result.length) {
    store.addAllData(dataId, result);
  }
});

onUnmounted(() => {
  store.deleteKey(dataId);
});
</script>
