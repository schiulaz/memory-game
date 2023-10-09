<template>
  <div class="grid place-items-center min-h-full">
    <div v-if="animals && !complete" class="max-w-7xl">
      <div class="grid grid-cols-2 gap-x-8 place-items-center gap-y-2 m-8">
        <div class="text-center">
          <i class="material-icons mr-2 text-3xl text-green-300">
            check_circle
          </i>
          <h3 class="text-sm md:text-2xl uppercase">
            Aciertos: {{ discoveredCards }}
          </h3>
        </div>
        <div class="text-center">
          <i class="material-icons mr-2 text-3xl text-red-300"> cancel </i>
          <h3 class="text-sm md:text-2xl uppercase">Errores: {{ errors }}</h3>
        </div>
      </div>

      <div
        class="grid place-items-center sm:grid-cols-2 gap-x-4 lg:grid-cols-4 lg:gap-x-4 xl:grid-cols-6 xl:gap-x-5 gap-y-3"
      >
        <div v-for="(el, index) in animals" v-bind:key="index">
          <!-- <h3>{{ el.fields.image.title }}</h3> -->
          <MemoryCard
            v-model="isFront"
            :src="el.imageUrl"
            :alt="el.alt"
            :content="el"
            @flip-card="update"
          />
        </div>
      </div>
    </div>
    <div v-if="complete">
      <h2 class="text-4xl">
        <i class="material-icons">favorite</i>
        Felicitaciones! <i class="material-icons">favorite</i>
      </h2>
      <button
        @click="newGame()"
        class="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-invalid:pointer-events-none group-invalid:opacity-30"
      >
        Nueva partida
      </button>
    </div>
    <div
      v-if="!animals && !loading"
      class="flex h-screen justify-center items-center"
    >
      <div class="text-center">
        <i class="material-icons text-8xl">block</i>
        <h2 class="text-xl">
          Tenemos un inconveniente. Intenta nuevamente mas tarde.
        </h2>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { useStore } from "vuex";

import { computed, ref, onMounted } from "vue";
import MemoryCard from "../components/MemoryCard.vue";

const store = useStore();

const animals = ref(null);
const selectedCards = ref([]);
const discoveredCards = ref(0);
const isFront = ref(true);
const errors = ref(0);
const complete = ref(false);
const user = computed(() => localStorage.getItem("user"));
const loading = computed(() => store.state.memoryGame.loading);

const shuffleCards = (animals) => {
  let mixedList = animals.splice(0, 6);
  mixedList = mixedList.reduce(
    (res, current) => [...res, current, current],
    []
  );
  mixedList = mixedList.sort((a, b) => Math.random() - 0.5);
  return mixedList.map((item, index) => {
    return {
      id: index,
      imageUrl: item.fields.image.url,
      alt: item.fields.image.title,
      isFront: true,
      discovered: false,
      disabled: false,
    };
  });
};

const cleanSelected = () => {
  selectedCards.value = [];
};

const disableCards = () => {
  animals.value.forEach((item) => {
    item.disabled = true;
  });
};

const enableCards = () => {
  animals.value.forEach((item) => {
    if (!item.discovered) item.disabled = false;
  });
};

const newGame = async () => {
  animals.value = shuffleCards(await store.dispatch("memoryGame/loadAnimals"));
  complete.value = false;
  discoveredCards.value = 0;
  errors.value = 0;
};

const validateFinish = () => {
  let count = 0;
  animals.value.forEach((item) => {
    item.discovered ? count++ : null;
  });

  if (count == 12) {
    setTimeout(() => {
      complete.value = true;
    }, 3000);
  }
};

const checkSelected = ([firstSelected, secondSelected]) => {
  if (firstSelected.imageUrl === secondSelected.imageUrl) {
    discoveredCards.value++;
    animals.value[firstSelected.id].discovered = true;
    animals.value[secondSelected.id].discovered = true;
    cleanSelected();
  } else {
    setTimeout(() => {
      cleanSelected();
      animals.value[firstSelected.id].isFront = true;
      animals.value[firstSelected.id].disabled = false;
      animals.value[secondSelected.id].isFront = true;
      animals.value[secondSelected.id].disabled = false;
    }, 1000);
    errors.value++;
  }
};

const update = (selectedCard) => {
  if (selectedCards.value.length < 2) {
    selectedCard.disabled = true;
    selectedCards.value.push(selectedCard);
  }

  if (selectedCards.value.length == 2) {
    disableCards();
    checkSelected(selectedCards.value);
    setTimeout(() => {
      enableCards();
    }, 1500);
  }

  animals.value.forEach((item) => {
    if (item.discovered) item.disabled = true;
  });

  validateFinish();
};

const getDataFromApi = async () => {
  animals.value = shuffleCards(await store.dispatch("memoryGame/loadAnimals"));
  localStorage.getItem("user")
    ? store.commit("auth/setUser", user.value)
    : store.commit("auth/setUser", null);
};

onMounted(() => {
  getDataFromApi();
});
</script>
  

  