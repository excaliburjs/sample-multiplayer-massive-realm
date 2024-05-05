import { Level } from "./level";
import { Player } from "./player";

export class Network {
    joined = false;
    mrClient: MassiveRealmClientInstance;

    constructor(private level: Level) {
        this.mrClient = MassiveRealmClient({
            debug: false, // You will see the client's console logs in the browser.

            url: 'https://0df7-ba18-2e5d.massiverealm.net/',
            publicKey: 'sl-XTuFZXd9hy4ncS',

            autoReconnect: true,
            autoReconnectMaxRetries: 10,
            autoReconnectTimeout: 3000,

            onConnect: () => {
                console.log('Connected');
                this.mrClient.joinRoom('room');
            },

            onReconnectTry: (retry) => {
                console.log('Trying to reconnect', retry);
            },

            onDisconnect: (error) => {
                this.joined = false;
                console.log('Disconnected', error);
            },

            onJoinRoom: (roomId, isForwarded) => {
                this.joined = true;
                this.level.events.emit('onJoinRoom');
                // Getting the list of other players
                this.mrClient.call('GetAllPlayers');
                if (isForwarded) {
                    // If the user has been forwarded to this room from another one.
                    console.log('Forwarded to room', roomId);
                } else {
                    console.log('Joined to room', roomId);
                }
            },

            onError: (error) => {
                console.log('Connection error', error);
            },

            onCommand: (command, data) => {
                console.log('Command call received', command, data);
                // Add a new player to the scene or move if existing
                if (command === 'MovePlayer') {
                    this.level.events.emit(
                        'playerMove', {
                            id: data.player.id,
                            x: data.player.x,
                            y: data.player.y
                        }
                    );
                }
                // Remove player from the scene
                else if (command === 'DeletePlayer') {
                    this.level.events.emit('playerDelete', data.id);
                }
                // Add all players to the scene
                else if (command === 'AllPlayers') {
                    for (let i = 0; i < data.players.length; i++) {
                        this.level.events.emit(
                            'playerMove',{
                                id: data.player[i].id,
                                x: data.player[i].x,
                                y: data.player[i].y
                            }
                        );
                    }
                }
            },
        });

        window.addEventListener('beforeunload', () => {
            this.mrClient.disconnect(true);
        });
    }

    connect() {
        this.mrClient.connect(true);
    }

    updatePosition(player: Player) {
        if (!this.joined) return;

        this.mrClient.call('UpdatePosition', {x: player.pos.x, y: player.pos.y});
    }
}