import * as P5 from 'p5';
import {areaEffect} from "./types/areaEffect";
import {manualOne, stackedMountainGenerator} from "./effectGenerators";
import {bouncingRect} from "./effects/bouncingRect";
import {Coordinate} from "./types/coordinate";
import {CachedNoise} from "./types/cachedNoise";

let sketch = (s: P5) => {
    const COLUMNS_AND_ROWS = 256;
    const CANVAS_SIZE = 600
    let t = 0;
    let globalTimeMultiplier = 0.5
    let noiseCache: CachedNoise
    let effects: areaEffect[] = [
        new bouncingRect(
            10,
            10,
            new Coordinate(
                COLUMNS_AND_ROWS/2,
                10
            ),
            new Coordinate(
                COLUMNS_AND_ROWS/2,
                COLUMNS_AND_ROWS - 10
            ),
            s.color('#000000'),
            4,
        ),
        new bouncingRect(
            10,
            10,
            new Coordinate(
                COLUMNS_AND_ROWS/2,
                COLUMNS_AND_ROWS - 10
            ),
            new Coordinate(
                COLUMNS_AND_ROWS/2,
                10
            ),
            s.color('#000000'),
            4,
        ),
        new bouncingRect(
            10,
            10,
            new Coordinate(
                COLUMNS_AND_ROWS - 10,
                COLUMNS_AND_ROWS/2,
            ),
            new Coordinate(
                10,
                COLUMNS_AND_ROWS/2,
            ),
            s.color('#000000'),
            4,
        ),
        new bouncingRect(
            10,
            10,
            new Coordinate(
                10,
                COLUMNS_AND_ROWS/2,
            ),
            new Coordinate(
                COLUMNS_AND_ROWS - 10,
                COLUMNS_AND_ROWS/2,
            ),
            s.color('#000000'),
            4,
        ),
    ]
    let frameRateVisible = true;

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(220);
        s.pixelDensity(1)
        s.noSmooth()
        noiseCache = new CachedNoise(s.noise)
        // effects = stackedMountainGenerator(s)
        // effects.push(...manualOne(s))
        effects.push(...stackedMountainGenerator(s))
    }

    s.draw = () => {
        s.noStroke()
        s.background(255)

        for (let effect of effects) {
            effect.calculateFrameForTime(t, noiseCache.getNoiseFn())
            // effect.calculateFrameForTime(t, s.noise)
        }

        let img = s.createImage(COLUMNS_AND_ROWS, COLUMNS_AND_ROWS)
        for (let column = 0; column < COLUMNS_AND_ROWS; column++) {
            for (let row = 0; row < COLUMNS_AND_ROWS; row++) {
                for (let effect of effects) {
                    let color = effect.pixelColor(column, row)
                    if (color != null) {
                        img.set(column, row, color)
                        break;
                    }
                }
            }
        }
        img.updatePixels()
        s.image(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE)

        if (s.frameRate() !== 0) {
            t += 1/s.frameRate() * globalTimeMultiplier
            if (frameRateVisible) {
                s.fill(255)
                s.text(s.frameRate().toFixed(0), 10, 10)
            }
        }
    }

    s.keyPressed = () => {
        if (s.key === ' ') {
            frameRateVisible = !frameRateVisible
        }
        if (s.keyCode === s.ENTER) {
            if (s.isLooping()) {
                s.noLoop()
            } else {
                s.loop()
            }
        }
    }


}

new P5(sketch);