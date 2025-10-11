<script setup lang="js">

const model = defineModel({
  type: String,
  default: "",
})
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
