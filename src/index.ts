import * as P5 from 'p5';
import {effect, mountain, bouncingRect, circle} from "./types/effects";
import {Coordinate} from "./types/coordinate";


let sketch = (s: P5) => {
    const COLUMNS_AND_ROWS = 200;
    let PIXEL_WIDTH = 10;
    let t = 0;
    let globalTimeMultiplier = 0.4
    let effects: effect[] = [
        new circle(100, 100, 100, 20, s.color("#5d0707"))
    ]
    let shader: P5.Shader = null
    let frameRateVisible = true;
    let lastFrameRateEmission = 0;

    s.setup = () => {
        PIXEL_WIDTH = s.min( window.innerWidth/COLUMNS_AND_ROWS, window.innerHeight/COLUMNS_AND_ROWS)
        s.createCanvas(PIXEL_WIDTH*COLUMNS_AND_ROWS, PIXEL_WIDTH*COLUMNS_AND_ROWS, s.WEBGL)
        s.background(220);
        s.noSmooth()
        shader = s.createShader(require("./shaders/shader.vert"), require("./shaders/shader.frag"))
        // s.pixelDensity(1)
        s.noSmooth()
    }

    s.draw = () => {
        s.noStroke()
        s.background(255)

        shader.setUniform('u_time', t)
        shader.setUniform('u_resolution', [COLUMNS_AND_ROWS, COLUMNS_AND_ROWS])

        let types = []
        let centers = []
        let dimensions = []
        let colors = []
        let settings = []

        for (let effect of effects) {
            effect.setEffectStateForTime(t)
            types.push(effect.type)
            centers.push(effect.x, effect.y)
            dimensions.push(effect.width, effect.height)
            if (effect.color !== null) {
                colors.push(s.red(effect.color)/255, s.green(effect.color)/255, s.blue(effect.color)/255, s.alpha(effect.color)/255)
            } else {
                colors.push(0, 0, 0, 0)
            }

            settings.push(effect.settings[0], effect.settings[1], effect.settings[2], effect.settings[3])
        }

        shader.setUniform('u_effectTypes', types)
        shader.setUniform('u_effectCenters', centers)
        shader.setUniform('u_effectDimensions', dimensions)
        shader.setUniform('u_effectColors', colors)
        shader.setUniform('u_effectSettings', settings)

        s.shader(shader)
        s.rect(0-s.width/2, 0-s.height/2, s.width, s.height)

        if (s.frameRate() !== 0) {
            t += 1/s.frameRate() * globalTimeMultiplier
            if (frameRateVisible && Date.now() - lastFrameRateEmission > 1000) {
                console.log(s.frameRate().toFixed(0))
                lastFrameRateEmission = Date.now()
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