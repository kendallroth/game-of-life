<template>
  <div class="game">
    <div class="game-header">
      <div class="game-header__title">Conway's Game of Life</div>
      <GameStats class="game-header__stats" :stats="gameStats" />
    </div>
    <div class="board">
      <div v-for="(row, rIdx) in boardCells" :key="rIdx" class="board__row">
        <GameCell
          v-for="(cell, cIdx) in row"
          :key="cIdx"
          :cell="cell"
          :size="20"
          class="board__cell"
          @select="handleCellClick"
        />
      </div>
    </div>
    <GameActions
      :speed="gameSpeed"
      :status="simulationStatus"
      class="game-actions"
      @generate="generateBoard"
      @set-speed="setSpeed"
      @simulate="simulateStep(boardCells)"
      @start="startSimulation"
      @stop="stopSimulation('paused')"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

// Components
import GameActions from "./GameActions.vue";
import GameCell from "./GameCell.vue";
import GameStats from "./GameStats.vue";

// Utilities
import { countAliveNeighbours, forAllCells, generateBoardCells } from "@utilities/board.utils";

// Types
import type { ICell, IGameStats, SimulationStatus } from "@typings/game.types";

const boardSize = { x: 500, y: 300 };
const cellSize = 10;
const cellCount = { x: boardSize.x / cellSize, y: boardSize.y / cellSize };

const gameStats = reactive<IGameStats>({
  alive: 0,
  cells: 0,
  steps: 0,
});
/** Board rows/cells */
const boardCells = ref<ICell[][]>([]);

const gameSpeed = ref(1);

/** Simulation step interval */
const simulationInterval = ref<number | undefined>(undefined);
const simulationStatus = ref<SimulationStatus>("ready");

onMounted(() => {
  generateBoard();
});

/**
 * Prepare new board for simulation
 */
const generateBoard = () => {
  stopSimulation("ready");

  const [cells, stats] = generateBoardCells(cellCount, 0.2);

  boardCells.value = cells;

  gameStats.alive = stats.alive;
  gameStats.cells = stats.cells;
  gameStats.steps = 0;
};

/**
 * Simulate a simulation step
 *
 * @param cells - Game board rows/cells
 */
const simulateStep = (cells: ICell[][]) => {
  // NOTE: Should already be handled by end of previous simulation step!
  if (gameStats.alive <= 0) {
    stopSimulation("completed");
    return;
  }

  let alive = 0;

  // Determine which cells will die and which will live
  forAllCells(cells, (cell) => {
    if (cell.alive) {
      if (cell.aliveNeighbours < 3 || cell.aliveNeighbours > 3) {
        cell.alive = false;
      }
    } else {
      if (cell.aliveNeighbours === 3) {
        cell.alive = true;
      }
    }
  });

  // Recalculate amount of living neighbours
  forAllCells(cells, (cell) => {
    if (cell.alive) {
      alive++;
    }

    const neighbours = countAliveNeighbours(cell.neighbours);
    cell.aliveNeighbours = neighbours;
  });

  gameStats.alive = alive;
  gameStats.steps++;

  if (alive <= 0) {
    stopSimulation("completed");
  }
};

/**
 * Set simulation speed
 *
 * @param speed - Selected speed
 */
const setSpeed = (speed: number) => {
  gameSpeed.value = speed;

  if (simulationStatus.value === "running") {
    startInterval(speed);
  }
};

/** DEBUG */
const handleCellClick = (cell: ICell) => {
  console.log("Selected cell", cell);
};

/**
 * Stop the simulation
 */
const stopSimulation = (status: SimulationStatus) => {
  simulationStatus.value = status;
  clearInterval(simulationInterval.value);
};

/**
 * Start the simulation
 */
const startSimulation = () => {
  simulationStatus.value = "running";
  startInterval(gameSpeed.value);
};

/**
 * Start simulation interval (clearing previous interval)
 *
 * @param time - Simulation step time
 */
const startInterval = (time: number) => {
  clearInterval(simulationInterval.value);
  simulationInterval.value = setInterval(() => simulateStep(boardCells.value), time * 1000);
};
</script>

<style lang="scss" scoped>
.game {
  --border: 4px solid black;

  display: flex;
  flex-direction: column;
}

.board {
  display: flex;
  flex-direction: column;
  border: var(--border);
  border-radius: 4px;
}

.board__row {
  display: flex;
  flex-direction: row;
}

.game-header {
  display: flex;
  justify-content: space-between;
}

.game-header__title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.game-header__stats {
  position: relative;
  bottom: -4px;
  padding: 2px 12px;
  border: var(--border);
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: white;
  z-index: 1;
}

.game-actions {
  position: relative;
  top: -4px;
}
</style>
