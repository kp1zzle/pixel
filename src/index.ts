import * as P5 from 'p5';
import {mountainEffect} from "./mountainEffect";

let sketch = (s: P5) => {
    const COLUMNS_AND_ROWS = 256;
    const CANVAS_SIZE = 1000
    let t = 0;
    let globalTimeMultiplier = 0.5
    let effects = [
        new mountainEffect(0, 0, 40, 30, s.color("#0c0eef"), null, 0.5,true),
        new mountainEffect(0, 0, 10, 256, s.color("#000000"), null, -0.8),
        new mountainEffect(0, 40, 100, 256, s.color("#000000"), null, 3),
        new mountainEffect(0, 0, 350, 256, s.color("#FFFFFF"), s.color("#000000")),
    ]
    let frameRateVisible = true;

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(220);
        s.pixelDensity(1)
        s.noSmooth()
    }

    s.draw = () => {
        s.noStroke()
        s.background(255)

        for (let effect of effects) {
            effect.calculateFrameForTime(t, s.noise)
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
                s.fill(0)
                s.text(s.frameRate().toFixed(0), 10, 10)
            }
        }
    }

    s.keyPressed = () => {
        if (s.key === ' ') {
            frameRateVisible = !frameRateVisible
        }
    }


}

new P5(sketch);