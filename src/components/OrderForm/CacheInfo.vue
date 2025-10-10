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
      <div class="text-caption">Информация о кэше:</div>
      <div>Категории: {{ categoriesCount }} записей</div>
      <div>Товары текущей категории: {{ productsCount }} записей</div>
      <div>Все товары в кэше: {{ allCachedProducts }} записей</div>
      <div>Время последнего обновления: {{ lastUpdateTime }}</div>
      <div v-if="isRefreshing" class="text-warning q-mt-sm">
        <q-spinner size="xs" class="q-mr-xs" />
        Обновление кэша...
      </div>
    </q-card-section>
  </q-card>
</template>
