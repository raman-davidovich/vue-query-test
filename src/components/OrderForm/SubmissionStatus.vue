<script setup lang="ts">
interface SubmissionStatusProps {
  isPending: boolean;
}

const props = defineProps<SubmissionStatusProps>();
</script>

<template>
  <div v-if="props.isPending" class="text-info">
    <q-spinner size="sm" class="q-mr-sm" />
    Sending order...
  </div>
</template>
