<script setup lang="ts">
import variables from "@/styles/variables.module.scss";
console.log(variables.bgColor);

import { useCounterStore } from "@/store/modules/counter";
const counterStore = useCounterStore();

defineProps<{ msg: string }>();

const count = ref(0);

// aa();
// a.aa();
api.a.aa();
</script>

<template>
  <h1 :style="{ color: variables.bgColor }">{{ msg }}</h1>
  <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
  <el-button type="info"><i-ep-InfoFilled />Info</el-button>
  <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
  <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>

  <div class="card">
    <el-button class="read-the-docs" type="button" @click="count++"
      >count is {{ count }}</el-button
    >
  </div>

  <el-form>
    <el-form-item label="数字："> {{ counterStore.count }}</el-form-item>
    <el-form-item label="加倍："> {{ counterStore.double }}</el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: $bg-color;
}
</style>
