<template>
  <div>
    <div
      @click="!props.content.disabled ? flip() : null"
      class="scene-card"
    >
      <div class="memory__card" :class="front ? '' : 'is-flipped'">
        <div class="card__face card__face-front"></div>
        <div
          class="card__face card__face-back"
          :style="`background-image: url(${src})`"
        ></div>
      </div>
    </div>
  </div>
</template>
    <script setup>
import { useStore } from "vuex";
import { computed, ref, defineEmits, watch } from "vue";

const props = defineProps({
  src: String,
  alt: String,
  content: Object,
  modelValue: Boolean,
});
const isFront = ref(true);
const front = computed(() => props.content.isFront);
const emit = defineEmits(["flip-card", "update:modelValue"]);

const flip = () => {
  props.content.isFront = !props.content.isFront;
  emit("flip-card", props.content);
};
</script>
    
<style scoped>
.scene-card { 
  width: 200px;
  height: 260px;
  perspective: 400px;
}

.memory__card {
  width: 200px;
  height: 260px;
  perspective: 400px;
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
  padding: 0px;
  border: 3px solid #fff;
  border-radius: 20px;
}

.memory__card.is-flipped {
  transform: translateX(-200px) rotateY(-180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 260px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  backface-visibility: hidden;
  border-radius: 20px;
}

.card__face-front {
  background: #54ccdb;
  background-image: url("../../../assets/img/pattern.svg");
  background-repeat: repeat;
}

.card__face-back {
  background: rgb(0, 0, 0);
  transform: rotateY(180deg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
</style>
    