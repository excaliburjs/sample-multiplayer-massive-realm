# Massive Realm Configuration

* Create an account
* Create a project



## Massive Realm Code

Client section defines event signatures callable by the client

![alt text](image.png)


Server section defines server processing 

![alt text](image-1.png)

![alt text](image-2.png)


```javascript
if (!$connection.vars.model) {
    $connection.vars.model = $room.model('Player');
    $connection.vars.model.id = $connection.id;
}

$connection.vars.model.x = $params.x;
$connection.vars.model.y = $params.y;

$connection.broadcast('MovePlayer', {
    player: $connection.vars.model.get()
});
```

![alt text](image-3.png)

```javascript
let players = [];
for (let i in $room.connections) {
    if ($room.connections[i].id == $connection.id) continue;
    players.push($room.connections[i].vars.model.get());
}
$connection.call('AllPlayers', { players });
```


Hooks

![alt text](image-4.png)


Models

![alt text](image-5.png)


Rooms

![alt text](image-6.png)