import { Scene } from 'phaser';
import { ENEMY_CONFIG } from '../../consts';
export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }
  create(): void {
    this.scene.start('test-scene');
    this.scene.start('ui-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.atlas('a-knight', 'tilemaps/tiles/dungeon-16-16.png', 'atlases/knight_atlas.json');
    this.load.atlas('a-hit01', 'tilemaps/tiles/hit01.png', 'atlases/hit01_atlas.json');
    this.load.atlas('a-hit03', 'tilemaps/tiles/hit03.png', 'atlases/hit03_atlas.json');
    this.load.atlas(
      ENEMY_CONFIG.lv1.runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-lv1_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.lv2.runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/enemy-lv2_atlas.json',
    );
    this.load.atlas(
      ENEMY_CONFIG.demonLv2.runAnimationKey,
      'tilemaps/tiles/dungeon-16-16.png',
      'atlases/demon-lv2_atlas.json',
    );

    // MAP LOADING
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/dungeon-16-16.png',
    });
    this.load.tilemapTiledJSON('test', 'tilemaps/json/test/test.json');
    this.load.tilemapTiledJSON('level1', 'tilemaps/json/level-1/dungeon.json');
    this.load.tilemapTiledJSON('level2', 'tilemaps/json/level-2/dungeon2.json');
    this.load.tilemapTiledJSON('lseg', 'tilemaps/json/lseg/lseg.json');

    this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('middle_characters_spr', 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 32,
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
