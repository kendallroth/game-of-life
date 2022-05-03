// Types
import type { ICell, ICoordinates, IGameStats } from "@typingsgame.types";

/**
 * Perform an operation for each cell
 *
 * @param cells    - Game board rows/cells
 * @param callback - Cell callback
 */
const forAllCells = (cells: ICell[][], callback: (cell: ICell) => void) => {
  cells.forEach((row) => {
    row.forEach((cell) => callback(cell));
  });
};

/**
 * Generate board cells
 *
 * @param   size       - Board size
 * @param   percentage - Fill percentage
 * @returns Tuple with generated cells and stats
 */
const generateBoardCells = (size: ICoordinates, percentage = 0): [cells: ICell[][], stats: IGameStats] => {
  const cells: ICell[][] = [];
  const stats: IGameStats = {
    alive: 0,
    cells: 0,
    steps: 0,
  };

  // Generate initial cells
  for (let y = 0; y < size.y; y++) {
    const row: ICell[] = [];

    for (let x = 0; x < size.x; x++) {
      const randomAlive = Math.random() <= percentage;

      if (randomAlive) {
        stats.alive++;
      }
      stats.cells++;

      row.push({
        alive: randomAlive,
        aliveNeighbours: 0,
        coordinates: { x, y },
        neighbours: [],
      });
    }

    cells.push(row);
  }

  // Calculate and assign neighbours
  forAllCells(cells, (cell) => {
    const neighbours = getNeighbours(cells, cell.coordinates);
    cell.neighbours = neighbours;
    cell.aliveNeighbours = countAliveNeighbours(neighbours);
  });

  return [cells, stats];
};

/**
 * Count the number of alive neighbours for a cell
 *
 * @param   neighbours - Cell neighbours
 * @returns Number of alive neighbours
 */
const countAliveNeighbours = (neighbours: ICell[]) => {
  return neighbours.reduce((accum, neighbour) => (neighbour.alive ? accum + 1 : accum), 0);
};

/**
 * Get a cell's neighbours
 *
 * @param   cells       - Game board rows/cells
 * @param   coordinates - Target coordinates
 * @returns Cell's neighbours
 */
const getNeighbours = (cells: ICell[][], coordinates: ICoordinates) => {
  const { x, y } = coordinates;
  const neighbours: ICell[] = [];

  for (let nx = x - 1; nx <= x + 1; nx++) {
    for (let ny = y - 1; ny <= y + 1; ny++) {
      if (nx === x && ny === y) continue;

      const cell = getCell(cells, { x: nx, y: ny });
      if (cell) neighbours.push(cell);
    }
  }

  return neighbours;
};

/**
 * Get a cell at board coordinates
 *
 * @param   cells       - Game board rows/cells
 * @param   coordinates - Cell coordinates
 * @returns Target cell
 */
const getCell = (cells: ICell[][], coordinates: ICoordinates) => {
  const { x, y } = coordinates;
  if (isNaN(y) || y < 0 || y >= cells.length) return null;
  if (isNaN(x) || x < 0 || x >= cells[0].length) return null;

  return cells[y][x];
};

export { countAliveNeighbours, forAllCells, generateBoardCells, getCell, getNeighbours };
