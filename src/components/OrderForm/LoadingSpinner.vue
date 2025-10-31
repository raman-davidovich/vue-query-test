<script setup lang="ts">
interface LoadingSpinnerProps {
  showing: boolean;
  label?: string;
}

const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
  label: "Loading data...",
});
</script>

<template>
  <q-inner-loading :showing="props.showing" :label="props.label" />
</template>
