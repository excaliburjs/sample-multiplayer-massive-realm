import { Color, ImageSource, Loader, SpriteSheet, TileMap } from "excalibur";

import tileMapPng from '../img/kenney_tiny-dungeon/Tilemap/tilemap_packed.png';

const Resources = {
    TileMap: new ImageSource(tileMapPng)
} as const;

export const TinyDungeonSpriteSheet = SpriteSheet.fromImageSource({
    image: Resources.TileMap,
    grid: {
        spriteHeight: 16,
        spriteWidth: 16,
        rows: 11,
        columns: 12
    }
});

export const loader = new Loader();
loader.backgroundColor = Color.Black.toString();
for (let res of Object.values(Resources)) {
    loader.addResource(res);
}