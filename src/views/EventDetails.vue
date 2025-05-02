<template>
  <BaseSidebar>
    <div class="mt-6 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="min-w-52">
          <h1 class="text-xl mb-4">{{ title }}</h1>
          <!--          <div class="mb-4">-->
          <!--            <a-->
          <!--              class="text-blue-500 hover:underline"-->
          <!--              :href="`https://cors-anywhere.herokuapp.com/corsdemo`"-->
          <!--              target="_blank">-->
          <!--              Get temporary access to use this page-->
          <!--            </a>-->
          <!--          </div>-->
          <FormKit
            type="select"
            label="Select an event"
            name="eventSelect"
            :options="activities"
            @input="onEventSelect"
            v-model="selectedEvent" />
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
              <tr v-for="item in eventPlayers" :key="item.playerId">
                <td class="px-4 py-2">
                  <div :class="{ 'text-amber-500': item.isOnWaitlist }">
                    {{ item.playerFullName }}
                  </div>
                  <div :class="{ 'text-amber-500': item.isOnWaitlist }">
                    {{ item.partnerFullName }}
                  </div>
                </td>
                <td class="px-4 py-2">
                  <div>
                    {{ item.playerSkill }}
                  </div>
                  <div>
                    {{ item.partnerSkill }}
                  </div>
                </td>
                <td class="px-4 py-2">
                  <div>
                    {{ item.playerAge === 0 ? '--' : item.playerAge }}
                  </div>
                  <div>
                    {{ item.partnerAge === 0 ? '--' : item.partnerAge }}
                  </div>
                </td>
                <td class="px-4 py-2">
                  <div>
                    {{ item.playerGender }}
                  </div>
                  <div>
                    {{ item.partnerGender }}
                  </div>
                </td>
                <td class="px-4 py-2">
                  <div>
                    {{
                      item.playerCityState === '' ? '--' : item.playerCityState
                    }}
                  </div>
                  <div>
                    {{
                      item.partnerCityState === ''
                        ? '--'
                        : item.partnerCityState
                    }}
                  </div>
                </td>
              </tr>
            </template>
          </BaseDataTable>
        </div>
      </div>
    </div>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from '@/components/BaseSidebar.vue';
import { computed, onMounted, ref } from 'vue';
import { useBracketStore } from '@/api/bracket.js';
import { useRoute } from 'vue-router';
import BaseDataTable from '@/components/BaseDataTable.vue';

const columns = ['Teams', 'Skill', 'Age', 'Gender', 'Location'];

const route = useRoute();
const bracketStore = useBracketStore();

const selectedEvent = ref('');
const eventPlayers = ref([]);

const activities = computed(() => {
  return bracketStore.getSavedActivities();
});

const title = computed(() => {
  return bracketStore.getEventTitle();
});

const onEventSelect = async (value) => {
  eventPlayers.value = [];
  eventPlayers.value = await bracketStore.getEventPlayers(value);
};

onMounted(async () => {
  await bracketStore.getAllActivities(route.params.id);

  if (bracketStore.getSavedActivities().length > 0) {
    await onEventSelect(bracketStore.getSavedActivities()[0].value);
  }
});
</script>
