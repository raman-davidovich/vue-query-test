<script setup>
import OrderForm from "./components/OrderForm.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Order form with caching </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-8col-lg-6">
            <OrderForm />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
