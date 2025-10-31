<script setup lang="ts">
const model = defineModel<string>({ default: "" });
</script>

<template>
  <q-input
    v-model="model"
    label="Comment"
    type="textarea"
    autogrow
    filled
    name="comment"
  />
</template>
