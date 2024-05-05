import { Actor, Color, vec } from "excalibur"

export class OtherPlayer extends Actor {

    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            width: 100,
            height: 100,
            color: Color.Gray
        })
    }
}