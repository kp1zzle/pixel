import * as P5 from 'p5';
import {mountainEffect} from "./mountainEffect";

let sketch = (s: P5) => {
    const COLUMNS_AND_ROWS = 50;
    let PIXEL_WIDTH = 10;
    let t = 0;
    let effects = [
        new mountainEffect(0, 40, 20, 25, "#000000", "#FFFFFF"),
        new mountainEffect(25, 10, 10, 25, "#000000", "#FFFFFF"),
        new mountainEffect(0, 0, 50, 50, "#FFFFFF", "#000000"),
    ]

    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight)
        PIXEL_WIDTH = s.min( window.innerWidth/COLUMNS_AND_ROWS, window.innerHeight/COLUMNS_AND_ROWS)
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
                }
                s.rect(column*PIXEL_WIDTH, row*PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH)
            }
        }
        t += 1/60
    }

}

new P5(sketch);