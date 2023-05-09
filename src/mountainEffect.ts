import {areaEffect} from "./areaEffect";

export class mountainEffect implements areaEffect {
    height: number;
    width: number;
    cutoff: number[];
    originX: number;
    originY: number;

    constructor(x: number, y: number, height: number, width: number) {
        this.originX = x
        this.originY = y
        this.height = height
        this.width = width
        this.cutoff = Array(width)
    }

    calculateFrameForTime(t: number, noise: (x: number, y?: number, z?: number) => number): void {
        for (let x = 0; x < this.width; x++) {
            (this.cutoff)[x] = noise(x / 5 + t) * this.height
        }
    }

    pixelColor(x: number, y: number): string {
        if (y <= (this.cutoff)[x]) {
            return '#AAAAAA'
        } else {
            return '#9899CC'
        }
    }
}