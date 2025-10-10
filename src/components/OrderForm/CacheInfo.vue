<script setup lang="js">
defineProps({
  categoriesCount: {
    type: Number,
    default: 0,
  },
  productsCount: {
    type: Number,
    default: 0,
  },
  allCachedProducts: {
    type: Number,
    default: 0,
  },
  isRefreshing: {
    type: Boolean,
    default: false,
  },
  lastUpdateTime: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <q-card flat class="q-mt-md bg-grey-2">
    <q-card-section>
      <div class="text-caption">Cache info:</div>
      <div>Categories: {{ categoriesCount }} records</div>
      <div>Products in the current category: {{ productsCount }} records</div>
      <div>All cached products: {{ allCachedProducts }} records</div>
      <div>Time of the last update: {{ lastUpdateTime }}</div>
      <div v-if="isRefreshing" class="text-warning q-mt-sm">
        <q-spinner size="xs" class="q-mr-xs" />
        Updating cache...
      </div>
    </q-card-section>
  </q-card>
</template>
