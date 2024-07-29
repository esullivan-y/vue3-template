<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

import { useCounterStore } from "@/store/modules/counter";
const counterStore = useCounterStore();
</script>

<template>
  <HelloWorld msg="" />
  <el-button type="primary" @click="counterStore.increment"
    >parent component pinia count++</el-button
  >
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
