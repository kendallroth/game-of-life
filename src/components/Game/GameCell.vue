<template>
  <div
    :class="{
      'is-alive': cell.alive,
    }"
    :style="`width: ${size}px; height: ${size}px;`"
    class="game-cell"
    @click="handleClick"
  >
    {{ false ? cell.aliveNeighbours : "" }}
  </div>
</template>

<script setup lang="ts">
// Types
import type { ICell } from "@typings/game.types";

const props = withDefaults(
  defineProps<{
    cell: ICell;
    size?: number;
  }>(),
  {
    size: 10,
  }
);

const emit = defineEmits<{
  (event: "select", cell: ICell): void;
}>();

const handleClick = () => {
  emit("select", props.cell);
};
</script>

<style lang="scss" scoped>
.game-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  // border: 1px solid grey;

  &.is-alive {
    background-color: #ff7272;
  }
}
</style>
