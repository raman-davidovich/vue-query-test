<script setup lang="ts">
interface SuccessBannerProps {
  isSuccess: boolean;
  orderId?: number | string | null;
  message?: string;
}

const props = withDefaults(defineProps<SuccessBannerProps>(), {
  orderId: null,
  message: "Order successfully sent!",
});
</script>

<template>
  <q-banner v-if="props.isSuccess" class="bg-positive text-white">
    <template v-if="props.orderId">
      Order successfully sent! ID: {{ props.orderId }}
    </template>
    <template v-else>
      {{ props.message }}
    </template>
  </q-banner>
</template>
