import { ref, nextTick } from "vue";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { OrderFormViewModel } from "../../src/view-models/orderformViewModel";

const {
  categoriesRepoMock,
  productsRepoMock,
  ordersRepoMock,
  createCacheMock,
} = vi.hoisted(() => ({
  categoriesRepoMock: { get: vi.fn() },
  productsRepoMock: { get: vi.fn() },
  ordersRepoMock: { submit: vi.fn() },
  createCacheMock: () => ({
    allCachedProducts: ref(0),
    isRefreshingCache: ref(false),
    lastCacheUpdate: ref(""),
    updateCachedProductsCount: vi.fn(),
    refetchAll: vi.fn(async () => {}),
  }),
}));

let cacheMock = createCacheMock();

vi.mock("@/repositories/index", () => ({
  categoriesRepository: categoriesRepoMock,
  productsRepository: productsRepoMock,
  ordersRepository: ordersRepoMock,
}));

vi.mock("@/composables/useCache", () => ({
  useCache: () => cacheMock,
}));

const queryKeySnapshots: string[][] = [];
let categoriesQueryFn: (() => Promise<any>) | null = null;
let productsQueryFn: (() => Promise<any>) | null = null;

const makeQueryState = () => ({
  data: ref<any>(),
  isLoading: ref(true),
  isError: ref(false),
  error: ref<Error | null>(null),
});

vi.mock("@tanstack/vue-query", () => {
  return {
    useQuery: vi.fn((options: any) => {
      const state = makeQueryState();
      const { queryKey, queryFn, enabled } = options;

      queryKeySnapshots.push(
        Array.isArray(queryKey) ? queryKey : queryKey.value
      );

      const keyValue = Array.isArray(queryKey) ? queryKey : queryKey.value;
      if (Array.isArray(keyValue) && keyValue[0] === "categories") {
        categoriesQueryFn = queryFn;
      } else {
        productsQueryFn = queryFn;
      }

      const execute = async () => {
        const isEnabled =
          typeof enabled === "function" ? enabled() : enabled ?? true;
        if (!isEnabled) {
          state.isLoading.value = false;
          return;
        }
        try {
          state.isLoading.value = true;
          state.error.value = null;
          state.isError.value = false;
          const result = await queryFn();
          state.data.value = result;
        } catch (error) {
          state.error.value = error as Error;
          state.isError.value = true;
        } finally {
          state.isLoading.value = false;
        }
      };

      execute();

      return {
        data: state.data,
        isLoading: state.isLoading,
        isError: state.isError,
        error: state.error,
        refetch: vi.fn(execute),
      };
    }),
    useMutation: vi.fn((options: any) => {
      const mutateAsync = vi.fn(async (payload: any) => {
        try {
          const result = await options.mutationFn(payload);

          if (options.onSuccess) {
            options.onSuccess(result, payload, undefined);
          }
          return result;
        } catch (error) {
          if (options.onError) {
            options.onError(error as Error, payload, undefined);
          }
          throw error;
        }
      });

      return {
        mutate: vi.fn(async (payload: any) => {
          try {
            await mutateAsync(payload);
          } catch (error) {}
        }),
        mutateAsync,
      };
    }),
  };
});

const categoriesSample = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" },
];

const productsSample = [
  { id: 101, name: "Smartphone", price: 30000 },
  { id: 102, name: "Laptop", price: 60000 },
];

const flushPromises = async () => {
  await Promise.resolve();
  await nextTick();
};

describe("OrderFormViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cacheMock = createCacheMock();

    categoriesRepoMock.get.mockReset();
    productsRepoMock.get.mockReset();
    ordersRepoMock.submit.mockReset();

    categoriesRepoMock.get.mockResolvedValue(categoriesSample);
    productsRepoMock.get.mockResolvedValue(productsSample);
    ordersRepoMock.submit.mockResolvedValue({
      id: 1,
      createdAt: "2024-01-01T00:00:00.000Z",
      category: "Electronics",
      product: "Smartphone",
      price: 30000,
      quantity: 1,
      total: 30000,
      comment: "",
    });
  });

  afterEach(() => {
    categoriesQueryFn = null;
    productsQueryFn = null;
  });

  it("Initialize a form with a default state", async () => {
    const vm = new OrderFormViewModel();
    await flushPromises();

    expect(vm.form.value).toEqual({
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    });
    expect(vm.categoriesLoading.value).toBe(false);
    expect(vm.productsLoading.value).toBe(false);
    expect(vm.categoriesOptions.value).toHaveLength(2);
    expect(vm.productsOptions.value).toHaveLength(2);
    expect(cacheMock.updateCachedProductsCount).toHaveBeenCalled();
  });

  it("Validate the form", async () => {
    const vm = new OrderFormViewModel();
    await flushPromises();

    expect(vm.isFormValid.value).toBe(false);

    vm.form.value.categoryId = 1;
    await nextTick();

    await flushPromises();

    vm.form.value.productId = 101;
    vm.form.value.quantity = 5;
    await nextTick();

    expect(vm.isFormValid.value).toBe(true);

    vm.form.value.quantity = 11;
    await nextTick();
    expect(vm.isFormValid.value).toBe(false);
  });

  it("resetForm resets the form to default state", async () => {
    const vm = new OrderFormViewModel();
    await flushPromises();

    vm.form.value = {
      categoryId: 1,
      productId: 101,
      quantity: 5,
      comment: "Test",
    };

    vm.resetForm();
    expect(vm.form.value).toEqual({
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    });
  });

  it("submit calls ordersRepository.submit with the correct payload", async () => {
    const vm = new OrderFormViewModel();
    await flushPromises();

    vm.form.value.categoryId = 1;
    vm.form.value.productId = 101;
    vm.form.value.quantity = 2;
    vm.form.value.comment = "Need fast delivery";

    await vm.submit();

    expect(ordersRepoMock.submit).toHaveBeenCalledTimes(1);
    expect(ordersRepoMock.submit).toHaveBeenCalledWith({
      category: "Electronics",
      product: "Smartphone",
      price: 30000,
      quantity: 2,
      total: 60000,
      comment: "Need fast delivery",
    });

    expect(vm.form.value).toEqual({
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    });
  });

  it("refetchAllData proxies to useCache.refetchAll", async () => {
    const vm = new OrderFormViewModel();
    await flushPromises();

    vm.form.value.categoryId = 2;

    await vm.refetchAllData();

    expect(cacheMock.refetchAll).toHaveBeenCalledTimes(1);
    expect(cacheMock.refetchAll).toHaveBeenCalledWith(
      2,
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("handle category download error", async () => {
    const error = new Error("Categories failed");
    categoriesRepoMock.get.mockRejectedValueOnce(error);

    const vm = new OrderFormViewModel();
    await flushPromises();

    expect(vm.categoriesHasError.value).toBe(true);
    expect(vm.categoriesError.value).toBe(error);
  });

  it("handle submit error", async () => {
    const error = new Error("Submit failed");
    ordersRepoMock.submit.mockRejectedValueOnce(error);

    const vm = new OrderFormViewModel();
    await flushPromises();

    vm.form.value.categoryId = 1;
    vm.form.value.productId = 101;
    vm.form.value.quantity = 1;

    await expect(vm.submit()).rejects.toThrow("Submit failed");
  });
});
