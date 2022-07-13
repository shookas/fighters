import { GameObjects, Scene, Tilemaps } from 'phaser';
export class LoadingScene extends Scene {

    constructor() {
        super('loading-scene');
    }
    create(): void {
        this.scene.start('level-1-scene');
        this.scene.start('ui-scene');
    }

    preload(): void {
        this.load.baseURL = 'assets/';
        // Our king texture
        this.load.image('king', 'sprites/king.png');
        // Our king atlas
        this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');
        this.load.atlas('a-enemy-lv1', 'tilemaps/tiles/dungeon-16-16.png', 'spritesheets/enemy-lv1_atlas.json');

        // MAP LOADING
        this.load.image({
            key: 'tiles',
            url: 'tilemaps/tiles/dungeon-16-16.png',
        });
        this.load.tilemapTiledJSON('level1', 'tilemaps/json/level-1/dungeon.json');
        this.load.tilemapTiledJSON('level2', 'tilemaps/json/level-2/dungeon2.json');

        // CHEST LOADING
        this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
    }
}