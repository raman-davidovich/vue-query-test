<template>
  <div class="row q-gutter-sm">
    <q-btn
      label="Отправить"
      type="submit"
      color="primary"
      :loading="isSubmitting"
      :disable="!isFormValid"
    />
    <q-btn
      label="Очистить"
      type="reset"
      color="secondary"
      @click="$emit('reset')"
      :disable="isSubmitting"
    />
    <q-btn
      label="Обновить кэш"
      color="warning"
      @click="$emit('refresh-cache')"
      :loading="isRefreshingCache"
      :disable="isRefreshingCache"
    />
  </div>
</template>

<script setup>
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

defineEmits(["reset", "refresh-cache"]);
</script>
