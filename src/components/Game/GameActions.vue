<template>
  <div class="actions">
    <div class="actions__left">
      <button class="elevation-1 is-icon" @click="emit('generate')">
        <SvgIcon :path="mdiPlus" :size="24" type="mdi" />
        Generate
      </button>
    </div>
    <div class="actions__right">
      <div class="actions__group elevation-1">
        <button v-if="status === 'running'" @click="emit('stop')">
          <SvgIcon :path="mdiPause" :size="24" type="mdi" />
        </button>
        <button v-else :disabled="!['ready', 'paused'].includes(status)" @click="emit('start')">
          <SvgIcon :path="mdiPlay" :size="24" type="mdi" />
        </button>
        <button :disabled="!['ready', 'paused'].includes(status)" @click="emit('simulate')">
          <SvgIcon :path="mdiAdvance" :size="24" type="mdi" />
        </button>
      </div>
      <span>|</span>
      <div class="actions__group elevation-1">
        <button
          v-for="speed in speeds"
          :key="speed.value"
          :class="{ 'is-active': speed.value === props.speed }"
          :disabled="status === 'completed'"
          @click="emit('set-speed', speed.value)"
        >
          <SvgIcon :path="speed.icon" :size="24" type="mdi" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  mdiPlus,
  mdiPlay,
  mdiPause,
  mdiSkipNext as mdiAdvance,
  mdiSpeedometerSlow as mdiSpeed1,
  mdiSpeedometerMedium as mdiSpeed2,
  mdiSpeedometer as mdiSpeed3,
} from "@mdi/js";
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";

// Types
import type { SimulationStatus } from "@typingsgame.types";

const props = defineProps<{
  /** Simulation speed */
  speed: number;
  /** Simulation status */
  status: SimulationStatus;
}>();

const emit = defineEmits<{
  /** Generate a new board */
  (e: "generate"): void;
  /** Set simulation speed */
  (e: "set-speed", speed: number): void;
  /** Simulate the next step */
  (e: "simulate"): void;
  /** Stop the simulation */
  (e: "stop"): void;
  /** Start the simulation */
  (e: "start"): void;
}>();

const speeds = [
  { icon: mdiSpeed1, label: "1x", value: 1 },
  { icon: mdiSpeed2, label: "2x", value: 0.5 },
  { icon: mdiSpeed3, label: "4x", value: 0.25 },
];
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 8px;
    border: none;

    &.is-icon {
      :deep(svg) {
        margin-right: 4px;
      }
    }

    &:not([disabled]) {
      cursor: pointer;

      &:hover {
        background-color: lightgrey;
      }
      &:active {
        outline: 2px solid dodgerblue;
      }
    }
  }
}

.actions__left,
.actions__right {
  display: flex;
  align-items: center;
  padding: 12px;
  border: var(--border);
  border-top: none;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 1;

  > *:not(:first-child) {
    margin-left: 16px;
  }
}

.actions__group {
  // --border: 1px solid black;
  --border: none;
  --border-radius: 8px;

  display: flex;
  border-radius: var(--border-radius);

  > button {
    border: var(--border);
    border-radius: 0;
    border-right: none;

    &.is-active {
      outline: 2px solid dodgerblue;
      z-index: 1;
    }
  }

  > :first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }
  > :last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border-right: var(--border);
  }
}
</style>
