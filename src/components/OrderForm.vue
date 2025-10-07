<script setup>
import { useOrderData } from "../composables/useOrderData.js";
import LoadingSpinner from "./OrderForm/LoadingSpinner.vue";
import ErrorBanner from "./OrderForm/ErrorBanner.vue";
import SuccessBanner from "./OrderForm/SuccessBanner.vue";
import CategorySelect from "./OrderForm/CategorySelect.vue";
import ProductSelect from "./OrderForm/ProductSelect.vue";
import QuantityInput from "./OrderForm/QuantityInput.vue";
import CommentInput from "./OrderForm/CommentInput.vue";
import ActionButtons from "./OrderForm/ActionButtons.vue";
import CacheInfo from "./OrderForm/CacheInfo.vue";
import SubmissionStatus from "./OrderForm/SubmissionStatus.vue";

const {
  form,
  categoriesData,
  categoriesLoading,
  categoriesHasError,
  categoriesError,
  productsData,
  productsLoading,
  productsHasError,
  productsError,
  mutation,
  allCachedProducts,
  isRefreshingCache,
  lastCacheUpdate,
  categoriesOptions,
  productsOptions,
  isFormValid,
  resetForm,
  handleSubmit,
  handleRefetchAll,
} = useOrderData();
</script>

<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5 q-mb-md">Форма заказа товара</div>

      <LoadingSpinner :showing="categoriesLoading" />

      <ErrorBanner
        :has-error="categoriesHasError"
        :products-error="productsError"
        :categories-error="categoriesError"
        :show-retry-button="true"
        @retry="handleRefetchAll"
      />

      <q-form @submit="handleSubmit" class="q-gutter-md">
        <CategorySelect
          v-model="form.categoryId"
          :options="categoriesOptions"
          :loading="categoriesLoading"
          :has-error="categoriesHasError"
        />

        <ProductSelect
          v-model="form.productId"
          :options="productsOptions"
          :loading="productsLoading"
          :has-error="productsHasError"
          :category-id="form.categoryId"
        />

        <QuantityInput v-model.number="form.quantity" />

        <CommentInput v-model="form.comment" />

        <SubmissionStatus :is-pending="mutation.isPending.value" />

        <SuccessBanner
          :is-success="mutation.isSuccess.value"
          :order-id="mutation.data.value?.id"
        />

        <ErrorBanner
          :has-error="mutation.isError.value"
          :mutation-error="mutation.error.value"
        />

        <ActionButtons
          :is-submitting="mutation.isPending.value"
          :is-form-valid="isFormValid"
          :is-refreshing-cache="isRefreshingCache"
          @reset="resetForm"
          @refresh-cache="handleRefetchAll"
        />
      </q-form>

      <CacheInfo
        :categories-count="categoriesData?.length || 0"
        :products-count="productsData?.length || 0"
        :all-cached-products="allCachedProducts"
        :is-refreshing="isRefreshingCache"
        :last-update-time="lastCacheUpdate"
      />
    </q-card-section>
  </q-card>
</template>
