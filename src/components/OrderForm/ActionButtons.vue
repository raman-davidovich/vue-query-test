<script setup lang="js">
defineProps({
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  isFormValid: {
    type: Boolean,
    required: true,
  },
  isRefreshingCache: {
    type: Boolean,
    default: false,
  },
});

const emit =defineEmits(["reset", "refresh-cache"]);
</script>

<template>
  <div class="row q-gutter-sm">
    <q-btn
      label="Buy"
      type="submit"
      color="primary"
      :loading="isSubmitting"
      :disable="!isFormValid"
    />
    <q-btn
      label="Clean form"
      type="reset"
      color="secondary"
      @click="emit('reset')"
      :disable="isSubmitting"
    />
    <q-btn
      label="Update cache"
      color="warning"
      @click="emit('refresh-cache')"
      :loading="isRefreshingCache"
      :disable="isRefreshingCache"
    />
  </div>
</template>
