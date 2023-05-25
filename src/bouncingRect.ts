import {areaEffect} from "./areaEffect";

export class bouncingRect implements areaEffect {
    height: number;
    width: number;
    cutoff: number[];
    leftBorder: number;
    rightBorder: number;
    topBorder: number;
    bottomBorder: number;
    color: p5.Color;
    timeMultiplier: number;
    rotate90: boolean;
    directionIncrement: number = 0.1;
    xPosition: number;
    yPosition: number;
    oscillateHorizontally: boolean;
    oscillateVertically: boolean;

    constructor(height: number, width: number, leftBorder: number, rightBorder: number, topBorder: number, bottomBorder: number, color: p5.Color, oscillateHorizontally: boolean, oscillateVertically: boolean, timeMultiplier?: number, rotate90?: boolean) {
        this.height = height
        this.width = width
        this.cutoff = Array(width)
        this.leftBorder = leftBorder
        this.rightBorder = rightBorder
        this.topBorder = topBorder
        this.bottomBorder = bottomBorder
        this.color = color
        this.timeMultiplier = 1
        if (typeof timeMultiplier !== 'undefined') {
            this.timeMultiplier = timeMultiplier
        }
        if (typeof rotate90 !== 'undefined') {
            this.rotate90 = rotate90
        }
        this.xPosition = leftBorder
        this.yPosition = topBorder
        this.oscillateHorizontally = oscillateHorizontally
        this.oscillateVertically = oscillateVertically
    }

    calculateFrameForTime(t: number, noise: (x: number, y?: number, z?: number) => number): void {
        if (this.oscillateHorizontally) {
            this.xPosition += Math.sin(t * this.timeMultiplier)
        }

        if (this.oscillateVertically) {
            this.yPosition += Math.sin(t * this.timeMultiplier)
        }
    }

    pixelColor(x: number, y: number): p5.Color | null {
        if (x >= this.xPosition && x <= this.xPosition + this.width && y >= this.yPosition && y <= this.yPosition + this.height) {
            return this.color
        }
        return null
    }
}