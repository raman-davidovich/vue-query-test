<script setup lang="ts">
interface CacheInfoProps {
  categoriesCount?: number;
  productsCount?: number;
  allCachedProducts?: number;
  isRefreshing?: boolean;
  lastUpdateTime: string;
}

const props = withDefaults(defineProps<CacheInfoProps>(), {
  categoriesCount: 0,
  productsCount: 0,
  allCachedProducts: 0,
  isRefreshing: false,
});
</script>

<template>
  <q-card flat class="q-mt-md bg-grey-2">
    <q-card-section>
      <div class="text-caption">Cache info:</div>
      <div>Categories: {{ props.categoriesCount }} records</div>
      <div>
        Products in the current category: {{ props.productsCount }} records
      </div>
      <div>All cached products: {{ props.allCachedProducts }} records</div>
      <div>Time of the last update: {{ props.lastUpdateTime }}</div>
      <div v-if="props.isRefreshing" class="text-warning q-mt-sm">
        <q-spinner size="xs" class="q-mr-xs" />
        Updating cache...
      </div>
    </q-card-section>
  </q-card>
</template>
