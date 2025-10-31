<script setup lang="ts">
interface ActionButtonsProps {
  isSubmitting?: boolean;
  isFormValid: boolean;
  isRefreshingCache?: boolean;
}

interface ActionButtonsEmits {
  reset: [];
  "refresh-cache": [];
}

const props = defineProps<ActionButtonsProps>();

const emit = defineEmits<ActionButtonsEmits>();
</script>

<template>
  <div class="row q-gutter-sm">
    <q-btn
      label="Buy"
      type="submit"
      color="primary"
      :loading="props.isSubmitting"
      :disable="!props.isFormValid"
    />
    <q-btn
      label="Clean form"
      type="reset"
      color="secondary"
      @click="emit('reset')"
      :disable="props.isSubmitting"
    />
    <q-btn
      label="Update cache"
      color="warning"
      @click="emit('refresh-cache')"
      :loading="props.isRefreshingCache"
      :disable="props.isRefreshingCache"
    />
  </div>
</template>
