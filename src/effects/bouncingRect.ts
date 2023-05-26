import {areaEffect} from "../types/areaEffect";
import {Coordinate} from "../types/coordinate";

export class bouncingRect implements areaEffect {
    height: number;
    width: number;
    startPoint: Coordinate;
    endPoint: Coordinate;
    color: p5.Color;
    secsPerOscillation: number;
    position: Coordinate;
    direction: number;

    constructor(height: number, width: number, startPoint: Coordinate, endPoint: Coordinate, color: p5.Color, secsPerOscillation: number) {
        this.height = height
        this.width = width
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.color = color
        this.secsPerOscillation = secsPerOscillation
        this.position = structuredClone(startPoint)
        this.direction = 1
    }

    calculateFrameForTime(t: number, noise: (x: number, y?: number, z?: number) => number): void {
        this.position.x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * (this.smoothstep(0, this.secsPerOscillation/2, t % this.secsPerOscillation) - this.smoothstep(this.secsPerOscillation/2, this.secsPerOscillation, t % this.secsPerOscillation))
        this.position.y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * (this.smoothstep(0, this.secsPerOscillation/2, t % this.secsPerOscillation) - this.smoothstep(this.secsPerOscillation/2, this.secsPerOscillation, t % this.secsPerOscillation))

        if (this.position.x >= this.endPoint.x || this.position.y >= this.endPoint.y) {
            this.direction *= -1
        }
    }

    smoothstep(edge0: number, edge1: number, x: number): number {
        // Scale, and clamp x to 0..1 range
        x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
        // Evaluate polynomial
        return x * x * (3 - 2 * x)
    }

    pixelColor(x: number, y: number): p5.Color | null {
        x = x + .5
        y = y + .5
        if (x >= this.position.x - this.width/2 && x <= this.position.x + this.width/2 && y >= this.position.y - this.height/2 && y <= this.position.y + this.height/2) {
            return this.color
        }
        return null
    }
}