import {areaEffect} from "./areaEffect";

export class mountainEffect implements areaEffect {
    height: number;
    width: number;
    cutoff: number[];
    originX: number;
    originY: number;
    topColor: string;
    bottomColor: string;
    timeMultiplier: number;
    rotate90: boolean;

    constructor(x: number, y: number, height: number, width: number, topColor: string, bottomColor: string, timeMultiplier?: number, rotate90?: boolean) {
        this.originX = x
        this.originY = y
        this.height = height
        this.width = width
        this.cutoff = Array(width)
        this.topColor = topColor
        this.bottomColor = bottomColor
        this.timeMultiplier = 1
        if (typeof timeMultiplier !== 'undefined') {
            this.timeMultiplier = timeMultiplier
        }
        if (typeof rotate90 !== 'undefined') {
            this.rotate90 = rotate90
        }
    }

    calculateFrameForTime(t: number, noise: (x: number, y?: number, z?: number) => number): void {
        let max = this.height
        let len = this.width
        if (this.rotate90) {
            max = this.width
            len = this.height
        }
        for (let x = 0; x < len; x++) {
            (this.cutoff)[x] = noise(x / 5 + (t*this.timeMultiplier)) * max
        }
    }

    pixelColor(x: number, y: number): string | null {
        if (x - this.originX < 0 || x - (this.originX + this.width) >= 0 ||
            y - this.originY < 0 || y - (this.originY + this.height) > 0) {
            return null
        }
        let originY = this.originY
        if (this.rotate90) {
            let swap = x
            x = y
            y = swap
            // originY = this.originX
        }
        if ((y - originY) <= (this.cutoff)[x]) {
            return this.topColor
        } else {
            return this.bottomColor
        }
    }
}