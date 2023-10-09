<template>
  <div>
    <div v-if="!isLogin">
      <Header />
    </div>

    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import Header from "./AppLayoutDefault.vue";
const router = useRouter();

const isLogin = computed(() => {
  return router.currentRoute.value.name == "Login" ? true : false;
});
</script>

