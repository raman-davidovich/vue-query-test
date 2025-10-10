<script setup lang="js">
defineProps({
  isPending: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div v-if="isPending" class="text-info">
    <q-spinner size="sm" class="q-mr-sm" />
    Sending order...
  </div>
</template>
