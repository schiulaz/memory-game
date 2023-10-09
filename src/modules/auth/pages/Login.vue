<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-4xl font-bold leading-9 text-white">
        Memory Game
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <form class="space-y-6" > -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-white"
          >Your Name (*)</label
        >
        <div class="login-form">
          <input
            v-model="name"
            id="name"
            name="name"
            type="name"
            autocomplete="name"
            required
            class="block w-full rounded-md border-0 py-1.5 px-2 mt-4 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <h6
            v-if="!name"
            :class="`text-xs pb-3 mt-2 ${
              formValidationError ? 'login-form__user_required' : ''
            }`"
          >
            *Required Field
          </h6>
        </div>
      </div>

      <div></div>

      <div>
        <button
          @click="start()"
          class="login-form__button bg-indigo-600 hover:bg-indigo-500"
        >
          Comencemos
        </button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const auth = localStorage.getItem("user");

defineProps({
  msg: String,
});

const name = ref(null);
const formValidationError = ref(false);

const loadGame = () => {
  localStorage.setItem("user", name.value);
  router.push({ name: "Game" });
};
const start = () => {
  name.value ? loadGame() : (formValidationError.value = true);
};
</script>
  
  
  <style scoped>
.login-form__user_required {
  color: #f15959 !important;
}
.login-form__button {
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.375rem /* 6px */;
  padding: 0.5rem 0.75rem;
  margin-top: 2rem; /* 32px */
  font-size: 0.875rem /* 14px */;
  font-weight: 600;
  font-weight: 600;
  line-height: 1.25rem /* 20px */;
}
</style>
  