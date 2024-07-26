<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);

// aa();
// a.aa();
api.a.aa();
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
  <el-button type="info"><i-ep-InfoFilled />Info</el-button>
  <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
  <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>

  <div class="card">
    <el-button type="button" @click="count++">count is {{ count }}</el-button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
