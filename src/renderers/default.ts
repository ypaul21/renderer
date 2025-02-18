import { Svg } from "@svgdotjs/svg.js";
import { GridPoints } from "../grids/_base";
import { APRenderRep } from "../schemas/schema";
import { IRendererOptionsIn, RendererBase } from "./_base";
import { rotate, usePieceAt } from "../common/plotting";

export interface IPiecesArea {
    type: "pieces";
    pieces: [string, ...string[]];
    label: string;
}

/**
 * This is the default renderer used for most games.
 *
 */
export class DefaultRenderer extends RendererBase {

    public static readonly rendererName: string = "default";

    public render(json: APRenderRep, draw: Svg, options: IRendererOptionsIn): void {
        this.jsonPrechecks(json);
        if (this.json === undefined) {
            throw new Error("JSON prechecks fatally failed.");
        }
        this.optionsPrecheck(options);
        this.rootSvg = draw;

        // BOARD
        // Delegate to style-specific renderer
        if (this.json.board === null) {
            return this.renderGlyph();
        }

        // Load all the pieces in the legend (have to do this first so the glyphs are available for marking the board)
        this.loadLegend();

        let gridPoints: GridPoints;
        if (! ("style" in this.json.board)) {
            throw new Error(`This 'board' schema cannot be handled by the '${ DefaultRenderer.rendererName }' renderer.`);
        }
        switch (this.json.board.style) {
            case "squares-beveled":
            case "squares-checkered":
            case "squares":
            case "pegboard":
                gridPoints = this.squares();
                break;
            case "go":
                this.json.board.width = 19;
                this.json.board.height = 19;
            case "vertex":
            case "vertex-cross":
            case "vertex-fanorona":
                gridPoints = this.vertex();
                break;
            case "snubsquare":
                gridPoints = this.snubSquare();
                break;
            case "hex-of-hex":
                gridPoints = this.hexOfHex();
                break;
            case "hex-of-tri":
                gridPoints = this.hexOfTri();
                break;
            case "hex-of-cir":
                gridPoints = this.hexOfCir();
                break;
            case "hex-slanted":
                gridPoints = this.hexSlanted();
                break;
            case "hex-odd-p":
            case "hex-even-p":
            case "hex-odd-f":
            case "hex-even-f":
                gridPoints = this.rectOfHex();
                break;
            case "circular-cobweb":
                gridPoints = this.cobweb();
                break;
            case "sowing":
                gridPoints = this.sowing();
                break;
            case "conhex-cells":
                gridPoints = this.conhex();
                break;
            default:
                throw new Error(`The requested board style (${ this.json.board.style }) is not yet supported by the default renderer.`);
        }

        // PIECES
        const group = this.rootSvg.group().id("pieces");
        if (this.json.pieces !== null) {
            // Generate pieces array
            let pieces: string[][][] = [];

            if (typeof this.json.pieces === "string") {
                // Does it contain commas
                if (this.json.pieces.indexOf(",") >= 0) {
                    for (const row of this.json.pieces.split("\n")) {
                        let node: string[][];
                        if (row === "_") {
                            node = new Array(this.json.board.width).fill([]) as string[][];
                        } else {
                            let cells = row.split(",");
                            cells = cells.map((x) => { if (x === "") {return "-"; } else {return x; } });
                            node = cells.map((x) => [x]);
                        }
                        pieces.push(node);
                    }
                } else {
                    for (const row of this.json.pieces.split("\n")) {
                        let node: string[][];
                        if (row === "_") {
                            node = new Array(this.json.board.width).fill([]) as string[][];
                        } else {
                            const cells = row.split("");
                            node = cells.map((x) => [x]);
                        }
                        pieces.push(node);
                    }
                }
            } else if ( (this.json.pieces instanceof Array) && (this.json.pieces[0] instanceof Array) && (this.json.pieces[0][0] instanceof Array) ) {
                pieces = this.json.pieces as string[][][];
            } else {
                throw new Error("Unrecognized `pieces` property.");
            }

            // Place the pieces according to the grid
            for (let row = 0; row < pieces.length; row++) {
                for (let col = 0; col < pieces[row].length; col++) {
                    for (const key of pieces[row][col]) {
                        if ( (key !== null) && (key !== "-") ) {
                            const point = gridPoints[row][col];
                            const piece = this.rootSvg.findOne("#" + key) as Svg;
                            if ( (piece === null) || (piece === undefined) ) {
                                throw new Error(`Could not find the requested piece (${key}). Each piece in the \`pieces\` property *must* exist in the \`legend\`.`);
                            }
                            const factor = 0.85;
                            const use = usePieceAt(group, piece, this.cellsize, point.x, point.y, factor);
                            if (options.rotate && this.json.options && this.json.options.includes('rotate-pieces'))
                                rotate(use, options.rotate, point.x, point.y);
                            if (this.options.boardClick !== undefined) {
                                if ( ( (this.json.board.tileSpacing !== undefined) && (this.json.board.tileSpacing > 0) ) || ( (! this.json.board.style.startsWith("squares")) && (! this.json.board.style.startsWith("vertex")) ) ) {
                                    use.click((e : Event) => {this.options.boardClick!(row, col, key); e.stopPropagation(); });
                                }
                            }
                        }
                    }
                }
            }
        }

        // annotations
        if (this.options.showAnnotations) {
            this.annotateBoard(gridPoints);
        }

        // rotate gridpoints if necessary
        let modGrid = [...gridPoints.map(lst => [...lst.map(pt => { return {...pt};})])];
        if (this.options.rotate === 180) {
            modGrid = modGrid.map((r) => r.reverse()).reverse();
        }

        // `pieces` area, if present
        this.piecesArea(modGrid);

        // button bar
        this.placeButtonBar(modGrid);

        // key
        this.placeKey(modGrid);

        this.backFill();
    }

    /**
     * Helper function for producing a single glyph when `board` is set to `null`.
     *
     */
    private renderGlyph(): void {
        if ( (this.json === undefined) || (this.rootSvg === undefined) ) {
            throw new Error("Object in invalid state!");
        }
        // Load all the pieces in the legend
        this.loadLegend();
        if (this.json.pieces === null) {
            throw new Error("There must be a piece given in the `pieces` property.");
        }
        const key = this.json.pieces as string;
        const piece = this.rootSvg.findOne("#" + key) as Svg;
        if ( (piece === null) || (piece === undefined) ) {
            throw new Error(`Could not find the requested piece (${key}). Each piece in the \`pieces\` property *must* exist in the \`legend\`.`);
        }
        this.rootSvg.viewbox(0, 0, this.cellsize, this.cellsize);
        usePieceAt(this.rootSvg, piece, this.cellsize, this.cellsize / 2, this.cellsize / 2, 0.9);
    }
}

