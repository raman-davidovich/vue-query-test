import { ref, computed, watch, type Ref, type ComputedRef } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import type { Category } from "@/types/models/category.model";
import type { Product } from "@/types/models/product.model";
import type { OrderData, OrderResponse } from "@/types/models/order.model";
import {
  categoriesRepository,
  productsRepository,
  ordersRepository,
} from "@/repositories/index";
import { useCache } from "@/composables/useCache";

interface OrderFormState {
  categoryId: number | null;
  productId: number | null;
  quantity: number;
  comment: string;
}

interface SelectOption {
  label: string;
  value: number;
}

export class OrderFormViewModel {
  form: Ref<OrderFormState>;
  categoriesData: Ref<Category[] | undefined>;
  categoriesLoading: Ref<boolean>;
  categoriesHasError: Ref<boolean>;
  categoriesError: Ref<Error | null>;
  productsData: Ref<Product[] | undefined>;
  productsLoading: Ref<boolean>;
  productsHasError: Ref<boolean>;
  productsError: Ref<Error | null>;
  mutation: ReturnType<typeof useMutation<OrderResponse, Error, OrderData>>;
  allCachedProducts: Ref<number>;
  isRefreshingCache: Ref<boolean>;
  lastCacheUpdate: Ref<string>;
  categoriesOptions: ComputedRef<SelectOption[]>;
  productsOptions: ComputedRef<SelectOption[]>;
  isFormValid: ComputedRef<boolean>;

  private refetchCategories: () => Promise<any>;
  private refetchProducts: () => Promise<any>;
  private updateCachedProductsCount: () => void;
  private refetchAll: (
    categoryId: number | null,
    refetchCategories: () => Promise<any>,
    refetchProducts: () => Promise<any>
  ) => void;

  constructor() {
    this.form = ref<OrderFormState>({
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    });

    const categoriesQuery = useQuery<Category[], Error>({
      queryKey: ["categories"],
      queryFn: async () => categoriesRepository.get(),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

    this.categoriesData = categoriesQuery.data;
    this.categoriesLoading = categoriesQuery.isLoading;
    this.categoriesHasError = categoriesQuery.isError;
    this.categoriesError = categoriesQuery.error;
    this.refetchCategories = categoriesQuery.refetch;

    const productsQuery = useQuery<Product[], Error>({
      queryKey: computed(() => ["products", this.form.value.categoryId]),
      queryFn: async () => productsRepository.get(this.form.value.categoryId),
      enabled: computed(
        () =>
          !!this.form.value.categoryId && this.form.value.categoryId !== null
      ),
      staleTime: 2 * 60 * 1000,
    });

    this.productsData = productsQuery.data;
    this.productsLoading = productsQuery.isLoading;
    this.productsHasError = productsQuery.isError;
    this.productsError = productsQuery.error;
    this.refetchProducts = productsQuery.refetch;

    this.mutation = useMutation<OrderResponse, Error, OrderData>({
      mutationFn: async (payload) => ordersRepository.submit(payload),
      onSuccess: () => this.resetForm(),
    });

    const cache = useCache();
    this.allCachedProducts = cache.allCachedProducts;
    this.isRefreshingCache = cache.isRefreshingCache;
    this.lastCacheUpdate = cache.lastCacheUpdate;
    this.updateCachedProductsCount = cache.updateCachedProductsCount;
    this.refetchAll = cache.refetchAll;

    this.categoriesOptions = computed<SelectOption[]>(
      () =>
        this.categoriesData.value?.map((category) => ({
          label: category.name,
          value: category.id,
        })) ?? []
    );

    this.productsOptions = computed<SelectOption[]>(
      () =>
        this.productsData.value?.map((product) => ({
          label: `${product.name} - ${product.price} rub.`,
          value: product.id,
        })) ?? []
    );

    this.isFormValid = computed(
      () =>
        Boolean(this.form.value.categoryId) &&
        Boolean(this.form.value.productId) &&
        this.form.value.quantity >= 1 &&
        this.form.value.quantity <= 10
    );

    watch(
      [this.productsData, this.categoriesData],
      () => this.updateCachedProductsCount(),
      { deep: true }
    );

    watch(
      () => this.form.value.categoryId,
      (newValue, oldValue) => {
        if (newValue !== oldValue) this.form.value.productId = null;
      }
    );

    this.updateCachedProductsCount();
  }

  resetForm(): void {
    this.form.value = {
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    };
  }

  async submit(): Promise<void> {
    const selectedProduct = this.productsData.value?.find(
      (product) => product.id === this.form.value.productId
    );

    const selectedCategory = this.categoriesData.value?.find(
      (category) => category.id === this.form.value.categoryId
    );

    const payload: OrderData = {
      category: selectedCategory?.name,
      product: selectedProduct?.name,
      price: selectedProduct?.price,
      quantity: this.form.value.quantity,
      total: selectedProduct
        ? selectedProduct.price * this.form.value.quantity
        : 0,
      comment: this.form.value.comment,
    };

    await this.mutation.mutateAsync(payload);
  }

  async refetchAllData(): Promise<void> {
    await this.refetchAll(
      this.form.value.categoryId,
      this.refetchCategories,
      this.refetchProducts
    );
  }
}
