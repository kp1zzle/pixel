import * as P5 from 'p5';
import {effect, mountain} from "./types/effects";

export function stackedMountainGenerator(s: P5): effect[] {
    let colors = [
        s.color("#0c0eef"),
        s.color("#747474"),
        s.color("#000000"),
    ]

    let effects: effect[] = [
        new mountain(0, 0, 50, 256, s.color("#000000"), -0.8),
    ]

    for (let i = 0; i < 5; i++) {
        let u = 1
        if (i%2 ===0) {
            u = -1
        }
        effects.push(
            new mountain(0, 40*i, 256-(40*i), 256, s.random(colors), u*(0.5 + .4*i),),
        )
    }
    effects = effects.reverse()

    return effects;
}

// export function manualOne(s: P5): effect[] {
//     return []
//     return [

//         new mountainEffect(0, 0, 40, 30, s.color("#0c0eef"), null, 0.5,true),
//         new bouncingRect(5, 10, 0, 256, 40, 256, s.color("#0c0eef"), true, false),
//         new bouncingRect(5, 10, 0, 256, 45, 256, s.color("#0c0eef"), true, false, 2),
//         new bouncingRect(5, 10, 0, 256, 50, 256, s.color("#0c0eef"), true, false, 5),
//         new bouncingRect(10, 5, 0, 256, 50, 256, s.color("#0c0eef"), false, true, 1.1),
//         new mountainEffect(0, 0, 10, 256, s.color("#000000"), null, -0.8),
//         new mountainEffect(0, 40, 100, 256, s.color("#000000"), null, 3),
//         new mountainEffect(0, 0, 350, 256, s.color("#FFFFFF"), s.color("#000000")),
//     ]
// }

//
// [
//     new mountainEffect(0, 0, 40, 30, s.color("#0c0eef"), null, 0.5,true),
//     new mountainEffect(0, 0, 10, 200, s.color("#000000"), null, -0.8),
//     new mountainEffect(0, 40, 20, 200, s.color("#000000"), null, 1.7),
//     new mountainEffect(0, 0, 350, 200, s.color("#FFFFFF"), s.color("#000000")),
// ]