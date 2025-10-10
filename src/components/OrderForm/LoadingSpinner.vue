<script setup lang="js">
defineProps({
  showing: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    default: "Загрузка данных..."
  }
});
</script>

<template>
  <q-inner-loading :showing="showing" :label="label" />
</template>
