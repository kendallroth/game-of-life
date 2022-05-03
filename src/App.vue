<template>
  <main class="app">
    <GameBoard />
  </main>
</template>

<script setup lang="ts">
import GameBoard from "@components/Game/GameBoard.vue";
</script>

<style lang="scss">
@import "./assets/base.css";

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
