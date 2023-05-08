import * as p5 from 'p5';

// @ts-ignore
let sketch = (s: p5) => {
    const COLUMNS_AND_ROWS = 10;
    const PIXEL_WIDTH = 5;

    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight)
        s.background(220);
    }

    s.draw = () => {
        for (let column = 0; column < COLUMNS_AND_ROWS; column++) {
            for (let row = 0; row < COLUMNS_AND_ROWS; row++) {
                s.rect(column*PIXEL_WIDTH, row*PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH)
            }
        }
    }
}

const P5 = new p5(sketch);