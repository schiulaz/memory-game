<template>
  <div class="flex justify-between h-20 items-center">
    <h1 class=" uppercase text-1xl md:text-2xl  font-bold px-4">
      M<span class="text-indigo-500">e</span>mory Gam<span
        class="text-indigo-500"
        >e</span
      >
    </h1>
    <h3 class="text-xs  md:text-1xl px-4 flex items-center">
      <i class="material-icons">person</i>
      <span class="uppercase">{{ user }}</span>
      <a @click="logout()" title="Cerrar Sesión" class="text-sm mx-3 text-white mx-7"><i class="material-icons text-sm" >logout</i></a>
    </h3>
  </div>
</template>
  
  <script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore()

const user = computed(() => localStorage.getItem("user"));
const logout = () => {
  localStorage.removeItem("user");
  store.commit("auth/setUser", null);
  router.push({ name: "Login" });
};
</script>
  
<style scoped>
</style>