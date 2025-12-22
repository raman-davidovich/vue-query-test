<script setup lang="ts">
import { ref } from "vue";
import OrdersTable from "./components/OrdersTable.vue";
import OrderCreate from "./components/OrderCreate.vue";
import OrderEdit from "./components/OrderEdit.vue";

type ViewMode = "create" | "edit" | "list";

const currentView = ref<ViewMode>("list");
const selectedOrderId = ref<number | null>(null);

const ordersTableRef = ref<{ refetchOrders: () => Promise<void> } | null>(null);

const handleSelectOrder = (orderId: number) => {
  selectedOrderId.value = orderId;
  currentView.value = "edit";
};

const handleCreateOrder = () => {
  currentView.value = "create";
};

const handleBackToList = () => {
  currentView.value = "list";
  selectedOrderId.value = null;

  setTimeout(() => {
    ordersTableRef.value?.refetchOrders();
  }, 100);
};

const handleOrderSuccess = () => {
  handleBackToList();
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Order form with caching </q-toolbar-title>
        <q-space />
        <q-btn
          v-if="currentView !== 'list'"
          flat
          label="Back to list"
          icon="arrow_back"
          @click="handleBackToList"
        />
        <q-btn
          v-if="currentView === 'list'"
          flat
          label="Create order"
          icon="add"
          @click="handleCreateOrder"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <OrdersTable
              v-if="currentView === 'list'"
              ref="ordersTableRef"
              @select-order="handleSelectOrder"
            >
              <template #title>
                <div class="row items-center q-gutter-sm">
                  <q-icon name="list" size="md" />
                  <span>Orders list</span>
                </div>
              </template>
            </OrdersTable>
            <OrderCreate
              v-else-if="currentView === 'create'"
              @success="handleOrderSuccess"
            />
            <OrderEdit
              v-else-if="currentView === 'edit' && selectedOrderId"
              :order-id="selectedOrderId"
              @success="handleOrderSuccess"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
