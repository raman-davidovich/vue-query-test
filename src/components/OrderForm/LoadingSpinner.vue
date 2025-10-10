<script setup lang="js">
defineProps({
  showing: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    default: "Loading data..."
  }
});
</script>

<template>
  <q-inner-loading :showing="showing" :label="label" />
</template>
