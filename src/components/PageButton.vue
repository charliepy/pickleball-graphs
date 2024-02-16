<template>
  <button
    class="join-item btn"
    :class="page === label ? 'btn-primary text-white' : 'btn-info btn-outline'"
    @click="goToPage(label)">
    {{ label }}
  </button>
</template>

<script setup>
const goToPage = (num) => {
  emit('go-to', num);
};

const emit = defineEmits(['go-to']);

defineProps({
  label: { type: Number, default: 1 },
  page: { type: Number, default: 1 },
});
</script>
