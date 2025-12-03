<script setup lang="ts">
import { computed } from "vue";
import { useOrderFormData } from "../composables/useOrderFormData";
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

interface Props {
  mode?: "create" | "edit";
  orderId?: number | null;
  title?: string;
  showCacheInfo?: boolean;
  onSuccess?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
  orderId: null,
  title: "Product order form",
  showCacheInfo: true,
});

const emit = defineEmits<{
  success: [];
}>();

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
  submit,
  resetForm,
  refetchAllData,
  orderLoading,
  orderHasError,
  orderError,
  resetMutation,
} = useOrderFormData({
  mode: props.mode,
  orderId: props.orderId,
  onSuccess: () => {
    if (props.onSuccess) {
      props.onSuccess();
    }
    emit("success");
    resetForm();
  },
});

const handleRefetchAllData = () => refetchAllData();
const handleSubmit = async (event?: Event) => {
  event?.preventDefault();
  await submit();
};

const handleResetForm = () => {
  resetForm();
  resetMutation();
};

const isLoading = computed(
  () => categoriesLoading.value || (props.mode === "edit" && orderLoading.value)
);

const hasError = computed(
  () =>
    categoriesHasError.value || (props.mode === "edit" && orderHasError.value)
);
</script>

<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5 q-mb-md">{{ title }}</div>

      <LoadingSpinner :showing="isLoading" />

      <ErrorBanner
        :has-error="hasError"
        :productsError
        :categoriesError
        :mutationError="
          mode === 'edit' && orderError ? orderError : mutation.error.value
        "
        :show-retry-button="true"
        @retry="handleRefetchAllData"
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
          :isFormValid
          :isRefreshingCache
          @reset="handleResetForm"
          @refresh-cache="handleRefetchAllData"
        />
      </q-form>

      <CacheInfo
        v-if="showCacheInfo"
        :categories-count="categoriesData?.length || 0"
        :products-count="productsData?.length || 0"
        :allCachedProducts
        :is-refreshing="isRefreshingCache"
        :lastUpdateTime="lastCacheUpdate"
      />
    </q-card-section>
  </q-card>
</template>
