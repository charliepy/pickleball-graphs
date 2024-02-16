<template>
  <div
    class="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
    <table class="min-w-full text-sm">
      <!-- header -->
      <thead>
        <slot name="table-header"></slot>
      </thead>

      <!-- row -->
      <tbody class="divide-y divide-gray-100">
        <slot name="table-body"></slot>
      </tbody>
    </table>
  </div>
</template>
