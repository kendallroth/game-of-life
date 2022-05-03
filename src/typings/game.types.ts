export interface ICoordinates {
  x: number;
  y: number;
}

export interface ICell {
  /** Whether cell is currently alive */
  alive: boolean;
  /** Number of alive neighbours */
  aliveNeighbours: number;
  /** Cell coordinates */
  coordinates: ICoordinates;
  /** Number of neighbours */
  neighbours: ICell[];
}

export interface IGameStats {
  alive: number;
  cells: number;
  steps: number;
}

export type SimulationStatus = "ready" | "running" | "paused" | "completed";
