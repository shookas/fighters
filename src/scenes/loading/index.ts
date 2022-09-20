import { Scene } from 'phaser';
import { ENEMY_CONFIG, texturesSizes } from '../../consts';
export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }
  create(): void {
    this.scene.start('level-2-scene');
    this.scene.start('ui-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.atlas('a-knight', 'tilemaps/tiles/dungeon-16-16.png', 'atlases/knight_atlas.json');
    this.load.atlas('a-hit01', 'tilemaps/tiles/hit01.png', 'atlases/hit01_atlas.json');
    this.load.atlas('a-hit03', 'tilemaps/tiles/hit03.png', 'atlases/hit03_atlas.json');
    this.load.atlas(
      ENEMY_CONFIG.orcs['1'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-orc-1_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.orcs['2'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-orc-2_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.orcs['3'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-orc-3_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.orcs['4'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-orc-4_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.orcs['5'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-orc-5_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.zombies['1'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-zombi-1_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.zombies['2'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-zombi-2_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.zombies['3'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-zombi-3_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.demons['3'].runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-demon-3_atlas.json',
    );

    // MAP LOADING
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/dungeon-16-16.png',
    });
    this.load.tilemapTiledJSON('test', 'tilemaps/json/test/test.json');
    this.load.tilemapTiledJSON('level1', 'tilemaps/json/level-1/dungeon.json');
    this.load.tilemapTiledJSON('level2', 'tilemaps/json/level-2/dungeon3.json');
    this.load.tilemapTiledJSON('lseg', 'tilemaps/json/lseg/lseg.json');

    this.load.spritesheet(texturesSizes.small, 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(texturesSizes.medium, 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet(texturesSizes.large, 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 32,
      frameHeight: 48,
      margin: 16
    });
    this.load.spritesheet('hit-01_spr', 'tilemaps/tiles/hit01.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet('hit-03_spr', 'tilemaps/tiles/hit03.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
  }
}
