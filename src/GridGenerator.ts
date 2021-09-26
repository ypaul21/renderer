// import { Nested } from "@svgdotjs/svg.js";
// import { SVG } from "@svgdotjs/svg.js";

export interface IPoint {
    readonly x: number;
    readonly y: number;
}

export interface IGeneratorArgs {
    readonly cellWidth?: number;
    readonly cellHeight?: number;
    readonly cellSize?: number;
    readonly gridWidth?: number;
    readonly gridHeight?: number;
    readonly gridWidthMin?: number;
    readonly gridWidthMax?: number;
    readonly offsetX?: number;
    readonly offsetY?: number;
}

export type GridPoints = Array<Array<IPoint>>;

export type GridGenerator = (args: IGeneratorArgs) => GridPoints;

export function normalizeX(inGrid: GridPoints): GridPoints {
    let minX: number = 0;
    inGrid.forEach((row) => {
        minX = Math.min(minX, row[0].x);
    });
    const newGrid: GridPoints = [];
    for (const row of inGrid) {
        const node: IPoint[] = [];
        for (const p of row) {
            const newp: IPoint = {x: p.x + Math.abs(minX), y: p.y};
            node.push(newp);
        }
        newGrid.push(node);
    }

    return newGrid;
}
