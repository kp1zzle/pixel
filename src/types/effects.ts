import {Coordinate} from "./coordinate";
import * as p5 from "p5";

export interface effect {
    type: effectIdentifier;
    x: number;
    y: number;
    height: number;
    width: number;
    color: p5.Color | null;

    settings: [number, number, number, number];

    setEffectStateForTime(t: number): void;
}

export enum effectIdentifier {
    Empty ,
    Mountain,
    Rect,
    Circle,
    Stars,
    DancingRect,
}

export class mountain implements effect {
    type = effectIdentifier.Mountain;
    x: number;
    y: number;
    height: number;
    width: number;
    color: p5.Color | null;
    settings: [number, number, number, number];

    constructor(x: number, y: number, height: number, width: number, color?: p5.Color, timeMultiplier?: number) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        if (typeof color !== 'undefined') {
            this.color = color
        } else {
            this.color = null
        }
        let mult = Math.random()
        if (typeof timeMultiplier !== 'undefined') {
            mult = timeMultiplier
        }
        this.settings = [mult, Math.random(), Math.random(), Math.random()]

    }

    setEffectStateForTime(t: number): void {
        return
    }
}

export class bouncingRect implements effect {
    type = effectIdentifier.DancingRect;
    x: number;
    y: number;
    height: number;
    width: number;
    startPoint: Coordinate;
    endPoint: Coordinate;
    secsPerOscillation: number;
    direction: number;
    color: p5.Color | null;
    settings: [number, number, number, number];

    constructor(x: number, y: number, height: number, width: number, endPoint: Coordinate, secsPerOscillation: number) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.startPoint = new Coordinate(x, y)
        this.endPoint = endPoint
        this.secsPerOscillation = secsPerOscillation
        this.direction = 1
        this.color = null
        this.settings = [Math.random()* 10, Math.random() * 2, Math.random()* 5, Math.random()* 5]
    }

    smoothstep(edge0: number, edge1: number, x: number): number {
        // Scale, and clamp x to 0..1 range
        x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
        // Evaluate polynomial
        return x * x * (3 - 2 * x)
    }

    setEffectStateForTime(t: number): void {
        this.x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * (this.smoothstep(0, this.secsPerOscillation/2, t % this.secsPerOscillation) - this.smoothstep(this.secsPerOscillation/2, this.secsPerOscillation, t % this.secsPerOscillation))
        this.y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * (this.smoothstep(0, this.secsPerOscillation/2, t % this.secsPerOscillation) - this.smoothstep(this.secsPerOscillation/2, this.secsPerOscillation, t % this.secsPerOscillation))

        if (this.x >= this.endPoint.x || this.y >= this.endPoint.y) {
            this.direction *= -1
        }
    }
}


export class circle implements effect {
    type = effectIdentifier.Circle;
    x: number;
    y: number;
    height: number;
    width: number;
    color: p5.Color | null;
    settings: [number, number, number, number];

    constructor(x: number, y: number, height: number, width: number, color?: p5.Color, timeMultiplier?: number) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        if (typeof color !== 'undefined') {
            this.color = color
        } else {
            this.color = null
        }
        this.settings = [Math.random(), Math.random(), Math.random(), Math.random()]

    }

    setEffectStateForTime(t: number): void {
        return
    }
}

export class stars implements effect {
    type = effectIdentifier.Stars;
    x: number;
    y: number;
    height: number;
    width: number;
    color: p5.Color | null;
    settings: [number, number, number, number];

    constructor(x: number, y: number, height: number, width: number, color?: p5.Color, timeMultiplier?: number) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        if (typeof color !== 'undefined') {
            this.color = color
        } else {
            this.color = null
        }
        this.settings = [Math.random(), Math.random(), Math.random(), Math.random()]

    }

    setEffectStateForTime(t: number): void {
        return
    }
}

export class rect implements effect {
    type = effectIdentifier.Rect;
    x: number;
    y: number;
    height: number;
    width: number;
    color: p5.Color | null;
    settings: [number, number, number, number];

    constructor(x: number, y: number, height: number, width: number, color?: p5.Color) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        if (typeof color !== 'undefined') {
            this.color = color
        } else {
            this.color = null
        }
        this.settings = [Math.random(), Math.random(), Math.random(), Math.random()]

    }

    setEffectStateForTime(t: number): void {
        return
    }
}