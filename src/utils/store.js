import { isEmpty } from 'lodash-es';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

export const useStore = defineStore('store', () => {
  const dataMap = ref({});
  const minPages = 6;
  const defaultPageSize = 10;

  const resetDataMap = () => {
    dataMap.value = {};
  };

  const getDataMap = (id) => {
    return dataMap.value[id];
  };

  const getInitialParams = () => {
    return {
      page: 1,
    };
  };

  const initializeData = (pageSize = defaultPageSize) => {
    const dataId = uuidv4();
    dataMap.value[dataId] = {
      currentPage: 1,
      1: [],
      count: 0,
      pageSize: pageSize,
      params: getInitialParams(),
    };
    return dataId;
  };

  const initializeDataWithId = (dataId, pageSize = defaultPageSize) => {
    dataMap.value[dataId] = {
      currentPage: 1,
      1: [],
      count: 0,
      pageSize: pageSize,
      params: getInitialParams(),
    };
    return dataId;
  };

  const resetData = (id) => {
    dataMap.value[id] = {
      currentPage: 1,
      1: [],
      count: 0,
      pageSize: dataMap.value[id].pageSize,
      params: dataMap.value[id].params,
    };
  };

  const deleteKey = (id) => {
    delete dataMap.value[id];
  };

  const getPageSize = (id) => {
    return dataMap.value[id]?.pageSize ?? defaultPageSize;
  };

  const setPageSize = (id, pageSize) => {
    dataMap.value[id].pageSize = pageSize;
  };

  const setCount = (id, count) => {
    dataMap.value[id].count = count;
  };

  const setParams = (id, params) => {
    dataMap.value[id].params = params;
  };

  const addAllData = (id, data) => {
    dataMap.value[id].count = data.length;
    const pageSize = dataMap.value[id].pageSize;
    const pages = getTotalPages(id);
    for (let i = 0; i < pages; i++) {
      dataMap.value[id][i + 1] = data.slice(i * pageSize, (i + 1) * pageSize);
    }
  };

  const isPaginated = (id) => {
    const count = dataMap.value[id]?.count ?? 0;
    const pageSize = dataMap.value[id]?.pageSize ?? defaultPageSize;
    return count / pageSize > minPages;
  };

  const getPaginatedData = (id) => {
    if (dataMap.value[id]) {
      const currentPage = dataMap.value[id].currentPage;
      return dataMap.value[id][currentPage] ?? [];
    }
    return [];
  };

  const goToPage = async (id, numPage) => {
    if (isEmpty(dataMap.value[id][numPage])) {
      dataMap.value[id].params.page = numPage;
    }
    dataMap.value[id].currentPage = numPage;
  };

  const getTotalPages = (id) => {
    const pageSize = dataMap.value[id].pageSize;
    return Math.ceil(dataMap.value[id].count / pageSize);
  };

  return {
    dataMap,
    resetDataMap,
    initializeData,
    initializeDataWithId,
    resetData,
    deleteKey,
    getDataMap,
    getInitialParams,
    getPageSize,
    setPageSize,
    setCount,
    setParams,
    addAllData,
    isPaginated,
    getPaginatedData,
    goToPage,
    getTotalPages,
  };
});

// Hot Module replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
