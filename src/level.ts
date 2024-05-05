import { Actor, Engine, EventEmitter, Scene, SceneEvents } from "excalibur";
import { Player } from "./player";
import { Network } from "./network";
import { OtherPlayer } from "./other-player";

export class Level extends Scene {

    network = new Network(this);
    currentPlayer!: Player;
    players = new Map<number, Actor>();
    events = new EventEmitter<SceneEvents & {
        onJoinRoom: void,
        playerMove: { id: number, x: number, y: number },
        playerDelete: number,
    }>();

    constructor() {
        super();
        this.events.on('onJoinRoom', this.onJoinRoom);
        this.events.on('playerMove', this.playerMove);
        this.events.on('playerDelete', this.playerDelete);
        this.camera.zoom = 4;
    }

    onInitialize(engine: Engine<any>): void {
        this.network.connect();
    }

    onJoinRoom = () => {
        this.currentPlayer = new Player(this.network);
        this.add(this.currentPlayer);
        this.players.set(-1, this.currentPlayer);
        this.network.updatePosition(this.currentPlayer);
        this.camera.pos = this.currentPlayer.pos;
    }

    playerMove = ({ id, x, y }: { id: number, x: number, y: number }) =>{
        if (!this.players.has(id)) {
            const otherPlayer = new OtherPlayer(x, y);
            this.add(otherPlayer);
            this.players.set(id, otherPlayer);
        }

        const somePlayer = this.players.get(id);
        if (somePlayer) {
            somePlayer.pos.x = x;
            somePlayer.pos.y = y;
        }
    }

    playerDelete = (id: number) => {
        const somePlayer = this.players.get(id);
        if (somePlayer) {
            somePlayer.kill();
            this.players.delete(id);
        }
    }
}