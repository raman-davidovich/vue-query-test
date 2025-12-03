<script setup lang="ts">
import { ref } from "vue";
import OrderCreate from "./components/OrderCreate.vue";
import OrderEdit from "./components/OrderEdit.vue";

const currentMode = ref<"create" | "edit">("create");
const orderId = ref<number>(1);

const switchToEdit = () => {
  currentMode.value = "edit";
};

const switchToCreate = () => {
  currentMode.value = "create";
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Order form with caching </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          :label="
            currentMode === 'create' ? 'Switch to edit' : 'Switch to create'
          "
          @click="currentMode === 'create' ? switchToEdit() : switchToCreate()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-8 col-lg-6">
            <OrderCreate v-if="currentMode === 'create'" />
            <OrderEdit v-else :order-id="orderId" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
