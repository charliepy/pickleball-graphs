<template>
  <div class="dropdown">
    <button tabIndex="{0}" class="btn btn-info btn-outline">...</button>
    <div
      tabIndex="{0}"
      class="card dropdown-content -left-12 top-14 w-36 border border-info bg-base-200 p-2 shadow">
      <FormKit
        :id="`pageForm_${page}`"
        v-model="formData"
        type="form"
        submit-label="Go"
        :submit-attrs="{
          wrapperClass: 'mt-2',
          inputClass: 'w-full justify-center',
        }"
        @submit="submitForm">
        <FormKit
          name="page"
          type="text"
          label="Page"
          label-class="py-1"
          validation="number"
          autocomplete="off" />
      </FormKit>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from '@/utils/store.js';

const props = defineProps({
  dataId: { type: String, required: true },
  page: { type: Number, default: 1 },
});

const formData = ref({});
const store = useStore();

const currentPage = computed(() => {
  return store.getDataMap(props.dataId).currentPage;
});

const submitForm = async (data) => {
  let page = Number(data.page);
  const maxPage = store.getTotalPages(props.dataId);

  if (page < 1) {
    page = 1;
  } else if (page > maxPage) {
    page = maxPage;
  }

  await store.goToPage(props.dataId, page);
  updatePageForm(page);
};

const updatePageForm = (num) => {
  formData.value.page = num;
};

defineExpose({
  updatePageForm,
});

onMounted(() => {
  formData.value.page = currentPage.value;
});
</script>
