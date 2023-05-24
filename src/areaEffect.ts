export interface areaEffect {
    calculateFrameForTime(t: number, noise: (x: number, y?: number, z?: number) => number): void;

    pixelColor(x: number, y: number): p5.Color | null;
}