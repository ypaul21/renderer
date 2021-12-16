/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type PositiveInteger = number;
/**
 * Pattern for hex colour strings
 */
export type Colourstrings = string;
/**
 * Pattern for the global stash definitions for the `homeworlds` renderer.
 */
export type Stashstrings = string;

/**
 * Games on the Abstract Play service must produce representations of the play area based on this schema. The front-end renderer will then translate that into various forms. Detailed documentation is difficult within a JSON document (e.g., no multi-line strings allowed), so see the website for standalone documentation.
 */
export interface APRenderRep {
  /**
   * The rendering engine the game wants to use.
   */
  renderer?: "default" | "stacking-offset" | "stacking-tiles" | "stacking-expanding" | "homeworlds" | "entropy";
  /**
   * Map each `piece` to an actual glyph with possible options.
   */
  legend?: {
    [k: string]: string | Glyph | [Glyph, ...Glyph[]];
  };
  /**
   * This is the game board itself.
   */
  board:
    | null
    | {
        style:
          | "squares"
          | "squares-checkered"
          | "squares-beveled"
          | "vertex"
          | "vertex-cross"
          | "go"
          | "hex-odd-p"
          | "hex-even-p"
          | "hex-odd-f"
          | "hex-even-f"
          | "hex-of-hex"
          | "hex-of-tri"
          | "hex-of-cir"
          | "snubsquare";
        /**
         * The base stroke weight of lines drawn to construct the board.
         */
        strokeWeight?: number;
        /**
         * The colour for lines drawn to construct the board, includes the labels.
         */
        strokeColour?: string;
        /**
         * The opacity of lines drawn to construct the board, includes the labels.
         */
        strokeOpacity?: number;
        /**
         * Only meaningful for the 'hex_of_*' styles. Determines the minimum width at the top and bottom of the board.
         */
        minWidth?: number;
        /**
         * Only meaningful for the 'hex_as_*' styles. Determines the maximum width at the centre of the board.
         */
        maxWidth?: number;
        /**
         * Required for the `squares*`, `vertex`, and `go` styles.
         */
        width?: number;
        /**
         * Required for the `squares*`, `vertex`, and `go` styles.
         */
        height?: number;
        /**
         * Only meaningful for the `squares` and `vertex` boards. Places heavier grid lines to create tiles that are X grids high.
         */
        tileWidth?: number;
        /**
         * Only meaningful for the `squares` and `vertex` boards. Places heavier grid lines to create tiles that are X grids high.
         */
        tileHeight?: number;
        /**
         * Only valid for the `stacking-offset` renderer. A number between 0 and 1 representing the percentage of a cell's space that should be used to offset each piece in the stack. A value of 1 will lead to no overlap. A value of 0 will stack all the pieces directly on top of each other.
         */
        stackOffset?: number;
        /**
         * Adds a visible area around the outside of the board intended to be used with a click handler for bearing off pieces or other such interactions. Only applied to the `squares*`, `vertex*` and `go` boards. Uses the `strokeWeight/Colour/Opacity` options for the border, and can include an optional fill. The opacity and colour will also be applied to the fill.
         */
        buffer?: {
          /**
           * The width of the zone expressed as a percentage of the cell size. If zero, the zone is omitted.
           */
          width: number;
          /**
           * The name of one of the built-in patterns for fill.
           */
          pattern?: string;
          /**
           * Choose which of the four sides you want displayed. By default, it's all four.
           */
          show?: ("N" | "E" | "S" | "W")[];
        };
        /**
         * Sometimes a board needs shaded areas, lines showing ownership of board edges, things like that. This is how those are indicated. Not all features are available for all board styles.
         */
        markers?: (
          | {
              /**
               * A way of placing small marker dots at certain points of the board.
               */
              type: "dots";
              /**
               * Like with `annotations`, the renderer knows nothing about a game's notation. You must provide instead the column and row numbers, which are zero-based: 0,0 is the top row, top column.
               */
              points: [
                {
                  row: number;
                  col: number;
                },
                ...{
                  row: number;
                  col: number;
                }[]
              ];
            }
          | {
              /**
               * This is for shading spaces or areas on the board.
               */
              type: "shading";
              /**
               * It expects at least three points, forming an auto-closed polygon. Board styles where a point is the center of a space (like the `squares` board style) instead point to the top-left corner of the space. Some experimentation may be required to enclose the area you want.
               */
              points: [
                {
                  row: number;
                  col: number;
                },
                {
                  row: number;
                  col: number;
                },
                {
                  row: number;
                  col: number;
                },
                ...{
                  row: number;
                  col: number;
                }[]
              ];
              /**
               * The colour of the shaded area. Can be either a number (which will be interpreted as a built-in player colour) or a hexadecimal colour string.
               */
              colour?: PositiveInteger | Colourstrings;
              /**
               * 1 is fully opaque. 0 is fully transparent.
               */
              opacity?: number;
            }
          | {
              /**
               * This will highlight one edge of the board, indicated by compass direction. It relies on the properties`strokeWeight` and `strokeOpacity`, if given. It does not work on the `hex-odd*`, `hex-even*`, `hex-of-cir` or `hex-of-hex` boards.
               */
              type: "edge";
              /**
               * An invalid edge designator (NE on a square map, for example) will just be ignored.
               */
              edge: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
              /**
               * The colour of the shaded area. Can be either a number (which will be interpreted as a built-in player colour) or a hexadecimal colour string.
               */
              colour: PositiveInteger | Colourstrings;
            }
          | {
              /**
               * Only works for the `squares*` board styles. Draws a thick line between two adjacent cells. It doesn't check adjacency, but the results will not be what you expect otherwise.
               */
              type: "fence";
              cell: {
                row: number;
                col: number;
              };
              side: "N" | "E" | "S" | "W";
              /**
               * The colour of the fence. Can be either a number (which will be interpreted as a built-in player colour) or a hexadecimal colour string.
               */
              colour?: PositiveInteger | Colourstrings;
            }
          | {
              /**
               * A way of incorporating a glyph from the legend into the board itself. Currently only works in the `default` and `stacking-offset` renderer.
               */
              type: "glyph";
              /**
               * The name of the glyph in the `legend`.
               */
              glyph: string;
              /**
               * Like with `annotations`, the renderer knows nothing about a game's notation. You must provide instead the column and row numbers, which are zero-based: 0,0 is the top row, top column.
               */
              points: [
                {
                  row: number;
                  col: number;
                },
                ...{
                  row: number;
                  col: number;
                }[]
              ];
            }
        )[];
      }
    | {
        /**
         * The name of the system. For simplicity, no whitespace, no weird characters, and 1–25 characters in length.
         */
        name: string;
        /**
         * If this is a home system, give the compass direction representing the player's seat. Omit property in shared systems.
         */
        seat?: "N" | "E" | "S" | "W";
        /**
         * Describes the system's stars.
         */
        stars: [string] | [string, string];
      }[]
    | {
        style: "entropy";
        /**
         * Describes the left-hand or top board
         */
        boardOne?: {
          label?: string;
          /**
           * Used as an aid to the player by occluding one of the boards
           */
          occluded?: boolean;
        };
        /**
         * Describes the right-hand or bottom board
         */
        boardTwo?: {
          label?: string;
          /**
           * Used as an aid to the player by occluding one of the boards
           */
          occluded?: boolean;
        };
        /**
         * Whether the two boards should be arranged horizontally or vertically
         */
        orientation?: "horizontal" | "vertical";
        /**
         * The base stroke weight of lines drawn to construct the board.
         */
        strokeWeight?: number;
        /**
         * Pattern for hex colour strings
         */
        strokeColour?: string;
        /**
         * The opacity of lines drawn to construct the board, includes the labels.
         */
        strokeOpacity?: number;
        [k: string]: unknown;
      };
  /**
   * Describes what pieces are where. For the `entropy` renderer, the pieces should be laid out on a grid 14 cells wide, which the renderer will break up into the two different boards.
   */
  pieces:
    | null
    | string
    | [string[][], ...string[][][]]
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string, string, string, string, string]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ][];
  /**
   * Areas are renderer-specific elements that are used and rendered in various ways.
   */
  areas?: (
    | {
        type: "globalStash";
        R: Stashstrings;
        G: Stashstrings;
        B: Stashstrings;
        Y: Stashstrings;
        [k: string]: unknown;
      }
    | {
        type: "expandedColumn";
        /**
         * The coordinates of the cell being expanded (optional).
         */
        cell?: string;
        /**
         * List of pieces (each must appear in the `legend`) to display alongside the board. The first piece in the array is the bottom of the stack.
         */
        stack: string[];
      }
    | {
        type: "localStash";
        label: string;
        /**
         * This is an array of stacks of pieces (themselves an array).
         */
        stash: string[][];
        [k: string]: unknown;
      }
  )[];
  /**
   * Instruct the renderer how to show any changes to the game state. See the docs for details. For the `entropy` renderer, the pieces are theoretically laid out on a grid 14 cells wide. So to show annotations on the second board, you will reference column indexes starting at 7. The number of rows does not change.
   */
  annotations?: (
    | {
        /**
         * The type of annotation
         */
        type: "move" | "eject" | "enter" | "exit" | "dots";
        /**
         * The cells involved in the annotation
         */
        targets: [
          {
            row: number;
            col: number;
            [k: string]: unknown;
          },
          ...{
            row: number;
            col: number;
            [k: string]: unknown;
          }[]
        ];
        style?: "solid" | "dashed";
        opacity?: number;
        /**
         * Pattern for hex colour strings
         */
        colour?: string;
        /**
         * A positive integer pointing to a player position. Based on user settings, an appropriate background fill colour will be chosen.
         */
        player?: number;
        arrow?: boolean;
        [k: string]: unknown;
      }
    | {
        /**
         * Name of the system
         */
        system: string;
        /**
         * The index of the colour, indicating the action used (1 = Red, 2 = Blue, 3 = Green, 4 = Yellow)
         */
        action: number;
        [k: string]: unknown;
      }
  )[];
  [k: string]: unknown;
}
/**
 * An individual glyph with options, used in the `legend` property.
 */
export interface Glyph {
  /**
   * The name of the actual glyph. It may not contain any whitespace.
   */
  name?: string;
  /**
   * Mutually exclusive with `name`. In this case, the glyph is plain text, shrunk down to the appropriate size to fit in a cell. This is intended for very short strings, like numbers.
   */
  text?: string;
  /**
   * A positive integer pointing to a player position. Based on user settings, an appropriate background fill colour will be chosen.
   */
  player?: number;
  /**
   * A 3- or 6-digit hex colour value. Do not use this to assign player colours! This should only be used for tweaking composite pieces. Ignored if `player` is also defined.
   */
  colour?: string;
  /**
   * A number representing how you want the glyph proportionately scaled. Numbers <1 will shrink the glyph. Numbers >1 will enlarge it.
   */
  scale?: number;
  /**
   * A number between 0 and 1 indicating how opaque to render the glyph. A value of 0 means completely transparent.
   */
  opacity?: number;
  /**
   * A number between -360 and 360 representing the degrees to rotate the glyph. Negative values rotate counterclockwise.
   */
  rotate?: number;
  /**
   * The number of units to nudge the glyph from centre.
   */
  nudge?: {
    /**
     * Negative values move the glyph to the left.
     */
    dx?: number;
    /**
     * Negative values move the glyph up.
     */
    dy?: number;
  };
}
