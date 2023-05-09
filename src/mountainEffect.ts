import {areaEffect} from "./areaEffect";

export class mountainEffect implements areaEffect {
    height: number;
    width: number;
    cutoff: number[];
    originX: number;
    originY: number;
    topColor: string;
    bottomColor: string;

    constructor(x: number, y: number, height: number, width: number, topColor: string, bottomColor: string) {
        this.originX = x
        this.originY = y
        this.height = height
        this.width = width
        this.cutoff = Array(width)
        this.topColor = topColor
        this.bottomColor = bottomColor
    }

    calculateFrameForTime(t: number, noise: (x: number, y?: number, z?: number) => number): void {
        for (let x = 0; x < this.width; x++) {
            (this.cutoff)[x] = noise(x / 5 + t) * this.height
        }
    }

    pixelColor(x: number, y: number): string | null {
        if (x - this.originX < 0 || x - (this.originX + this.width) >= 0 ||
            y - this.originY < 0 || y - (this.originY + this.height) > 0) {
            return null
        }
        if ((y - this.originY) <= (this.cutoff)[x]) {
            return this.topColor
        } else {
            return this.bottomColor
        }
    }
}