<template>
  <h4 class="h4">
    <span
      v-if="icon === 'vote-stamp'"
      class="d-inline-block icon-vote-stamp"
    ></span>
    <i v-else-if="icon" class="bi" :class="icon"></i>
    {{ text }}
    <small v-if="source" class="fs-7 fw-normal text-gray-500 d-block px-8 py-2">
      {{ `※資料來源：${source}` }}
    </small>
  </h4>
</template>

<script lang="ts" setup>
defineProps<{
  text: string
  icon?: string
  source?: string
}>()
</script>
