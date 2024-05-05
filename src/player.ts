import { Actor, Color, Engine, Keys, Vector, vec } from "excalibur";
import { Network } from "./network";


export class Player extends Actor {
    constructor(private network: Network) {
        super({
            pos: vec(400, 400),
            width: 100,
            height: 100,
            color: Color.Red
        })
    }

    onPostUpdate(engine: Engine<any>, delta: number): void {
        this.vel = Vector.Zero;

        const dir = vec(0, 0);
        if (engine.input.keyboard.isHeld(Keys.ArrowLeft) ) {
            dir.x = -1;
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowRight) ) {
            dir.x = 1;
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowUp) ) {
            dir.y = -1;
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowDown) ) {
            dir.y = 1;
        }

        if (dir.x !== 0 || dir.y !== 0) {
            this.move(dir);
        }
    }

    attack() {

    }

    move(dir: Vector) {
        dir.normalize();
        this.vel = dir.scale(100);
        this.network.updatePosition(this);
    }
}