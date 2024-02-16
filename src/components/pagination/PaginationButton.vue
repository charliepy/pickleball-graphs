<template>
  <div v-if="isPaginated">
    <div v-if="currentPage < 3">
      <div class="join flex justify-center">
        <PageButton :label="1" :page="currentPage" @go-to="goToPage" />
        <PageButton :label="2" :page="currentPage" @go-to="goToPage" />
        <template v-if="currentPage === 2">
          <PageButton :label="3" :page="currentPage" @go-to="goToPage" />
        </template>
        <GoToButton ref="goto" :data-id="dataId" :page="currentPage" />
        <PageButton
          :label="totalPages - 1"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton :label="totalPages" :page="currentPage" @go-to="goToPage" />
      </div>
    </div>
    <div v-else-if="currentPage < totalPages - 3">
      <div class="join flex justify-center">
        <PageButton
          :label="currentPage - 2"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton
          :label="currentPage - 1"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton
          :label="currentPage"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton
          :label="currentPage + 1"
          :page="currentPage"
          @go-to="goToPage" />
        <GoToButton ref="goto" :data-id="dataId" :page="currentPage" />
        <PageButton
          :label="totalPages - 1"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton :label="totalPages" :page="currentPage" @go-to="goToPage" />
      </div>
    </div>
    <div v-else-if="currentPage < totalPages - 1">
      <div class="join flex justify-center">
        <PageButton :label="1" :page="currentPage" @go-to="goToPage" />
        <PageButton :label="2" :page="currentPage" @go-to="goToPage" />
        <GoToButton ref="goto" :data-id="dataId" :page="currentPage" />
        <template v-if="currentPage === totalPages - 2">
          <PageButton
            :label="currentPage - 1"
            :page="currentPage"
            @go-to="goToPage" />
        </template>
        <PageButton
          :label="currentPage"
          :page="currentPage"
          @go-to="goToPage" />
        <template v-if="currentPage === totalPages - 3">
          <PageButton
            :label="currentPage + 1"
            :page="currentPage"
            @go-to="goToPage" />
        </template>
        <PageButton
          :label="totalPages - 1"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton :label="totalPages" :page="currentPage" @go-to="goToPage" />
      </div>
    </div>
    <div v-else>
      <div class="join flex justify-center">
        <PageButton :label="1" :page="currentPage" @go-to="goToPage" />
        <PageButton :label="2" :page="currentPage" @go-to="goToPage" />
        <GoToButton ref="goto" :data-id="dataId" :page="currentPage" />
        <template v-if="currentPage === totalPages - 1">
          <PageButton
            :label="currentPage - 1"
            :page="currentPage"
            @go-to="goToPage" />
        </template>
        <PageButton
          :label="totalPages - 1"
          :page="currentPage"
          @go-to="goToPage" />
        <PageButton :label="totalPages" :page="currentPage" @go-to="goToPage" />
      </div>
    </div>
  </div>
  <div v-else-if="showButton">
    <div class="join flex justify-center">
      <PageButton
        v-for="index in totalPages"
        :key="index"
        :label="index"
        :page="currentPage"
        @go-to="goToPage" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';
import GoToButton from './GoToButton.vue';
import PageButton from './PageButton.vue';
import { useStore } from '@/utils/store.js';

const props = defineProps({
  dataId: {
    type: String,
    required: true,
  },
});

const goto = ref(null);
const store = useStore();

const isPaginated = computed(() => {
  return store.isPaginated(props.dataId);
});

const currentPage = computed(() => {
  return store.getDataMap(props.dataId).currentPage;
});

const showButton = computed(() => {
  const count = store.getDataMap(props.dataId)?.count ?? 0;
  return count / store.getPageSize(props.dataId) > 1;
});

const totalPages = computed(() => {
  return store.getTotalPages(props.dataId);
});

const goToPage = async (numPage) => {
  await store.goToPage(props.dataId, numPage);
  if (isPaginated.value) {
    await nextTick();
    goto.value.updatePageForm(numPage);
  }
};
</script>
