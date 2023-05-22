import * as P5 from 'p5';
import {mountainEffect} from "./mountainEffect";

let sketch = (s: P5) => {
    const COLUMNS_AND_ROWS = 100;
    let PIXEL_WIDTH = 10;
    let t = 0;
    let globalTimeMultiplier = 0.5
    let effects = [
        new mountainEffect(0, 0, 40, 30, "#0c0eef", null, 0.5,true),
        new mountainEffect(0, 0, 10, 100, "#000000", null, -0.8),
        new mountainEffect(0, 40, 20, 100, "#000000", null, 1.7),
        new mountainEffect(0, 0, 150, 100, "#FFFFFF", "#000000"),
    ]

    s.setup = () => {

        PIXEL_WIDTH = s.min( window.innerWidth/COLUMNS_AND_ROWS, window.innerHeight/COLUMNS_AND_ROWS)
        s.createCanvas(PIXEL_WIDTH*COLUMNS_AND_ROWS, PIXEL_WIDTH*COLUMNS_AND_ROWS)
        s.background(220);
    }

    s.draw = () => {
        s.noStroke()

        for (let effect of effects) {
            effect.calculateFrameForTime(t, s.noise)
        }

        for (let column = 0; column < COLUMNS_AND_ROWS; column++) {
            for (let row = 0; row < COLUMNS_AND_ROWS; row++) {
                for (let effect of effects) {
                    let color = effect.pixelColor(column, row)
                    if (color != null) {
                        s.fill(color)
                        break;
                    }
                    s.fill("#ffffff")
                }
                s.rect(column*PIXEL_WIDTH, row*PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH)
            }
        }
        if (s.frameRate() !== 0) {
            t += 1/s.frameRate() * globalTimeMultiplier
        }

    }

}

new P5(sketch);