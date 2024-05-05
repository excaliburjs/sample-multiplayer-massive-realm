import { Color, ImageSource, Loader, TileMap } from "excalibur";

import tileMapPng from '../img/kenney_tiny-dungeon/Tilemap/tilemap_packed.png';

const Resources = {
    TileMap: new ImageSource(tileMapPng)
} as const;

export const loader = new Loader();
loader.backgroundColor = Color.Black.toString();
for (let res of Object.values(Resources)) {
    loader.addResource(res);
}