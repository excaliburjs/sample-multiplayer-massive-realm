
declare interface MassiveRealmClientOptions {
    debug: boolean, // You will see the client's console logs in the browser.
    url: string,
    publicKey: string,

    autoReconnect: boolean,
    autoReconnectMaxRetries: number,
    autoReconnectTimeout: number,

    onConnect: () => void,

    onReconnectTry: (retry) => void,

    onDisconnect: (error) => void,

    onJoinRoom: (roomId, isForwarded) => void,

    onError: (error) => void,

    onCommand: (command, data) => void,
}

declare interface MassiveRealmClientInstance {
    connect(reset = false) // Use true to reset connection attempts.
    disconnect(skipReconnect = false) // Optionally skips the automatic reconnect process.
    reconnect() // Closes the current connection and opens a new one.
    joinRoom(roomId: string) // Joins a new room; triggers onJoinRoom callback.
    leaveRoom() // Leaves the current room.
    call(commandName: string, params = {}) // Calls a server command with optional parameters.
}

declare function MassiveRealmClient(options: MassiveRealmClientOptions): MassiveRealmClientInstance {

}