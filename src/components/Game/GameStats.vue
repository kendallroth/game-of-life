<template>
  <div class="stats">
    <div class="stats__item">
      <div class="stats__item__label">Steps</div>
      <div class="stats__item__value">{{ stats.steps }}</div>
    </div>
    <div class="stats__item">
      <div class="stats__item__label">Alive</div>
      <div class="stats__item__value">{{ stats.alive }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import type { IGameStats } from "@typings/game.types";

defineProps<{
  stats: IGameStats;
}>();
</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  flex-direction: row;
  align-items: center;

  > .stats__item:not(:first-of-type) {
    margin-left: 24px;
  }
}

.stats__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stats__item__label {
  font-size: 1rem;
}

.stats__item__value {
  margin-top: -6px;
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
