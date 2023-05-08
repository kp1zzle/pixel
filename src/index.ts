import * as P5 from 'p5';

let sketch = (s: P5) => {
    const COLUMNS_AND_ROWS = 50;
    let PIXEL_WIDTH = 10;

    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight)
        PIXEL_WIDTH = s.min( window.innerWidth/COLUMNS_AND_ROWS, window.innerHeight/COLUMNS_AND_ROWS)
        s.background(220);
    }

    s.draw = () => {
        s.noStroke()
        for (let column = 0; column < COLUMNS_AND_ROWS; column++) {
            for (let row = 0; row < COLUMNS_AND_ROWS; row++) {
                s.fill(pixelColor(column, row))
                s.rect(column*PIXEL_WIDTH, row*PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH)
            }
        }
    }

    const pixelColor = (x: number, y: number): string => {
        if (x % 2 === 0 || y % 2 === 0) {
           return '#AAAAAA'
        }
        return '#9899CC'
    }
}

new P5(sketch);