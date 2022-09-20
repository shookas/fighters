import { Scene, Tilemaps } from 'phaser';
import { Enemy } from '../../enemy/Enemy';
import { ENEMY_CONFIG, WEAPONS } from '../../consts';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { Player } from '../../player/Player';
export class Test extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private chests!: Phaser.GameObjects.Sprite[];
  private enemies!: Enemy[];
  constructor() {
    super('test-scene');
  }
  create(): void {
    this.initMap();
    this.player = new Player(this, 410, 850);
    this.initChests();
    this.initWeapons();
    this.initCamera();
    this.initEnemies();
    this.registry.set('level', 0);
    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update(): void {
    this.player.update();
    this.enemies.forEach((enemy) => enemy.update());
  }

  private initMap(): void {
    this.map = this.make.tilemap({ key: 'test', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('test', 'tiles');
    this.map.createLayer('Ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
  }

  private initChests(): void {
    const chestPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Chests', (obj) => obj.name === 'ChestPoint'),
    );
    this.chests = chestPoints.map((chestPoint) =>
      this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(1.5),
    );
    this.chests.forEach((chest) => {
      this.physics.add.overlap(this.player, chest, (_, obj2) => {
        obj2.destroy();
        this.cameras.main.flash();
      });
    });
  }

  private initWeapons(): void {
    const weaponPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Weapon', (obj) => obj.name === 'WeaponPoint'),
    );
    const weapons = weaponPoints.map((weaponPoint) =>
      this.physics.add.sprite(weaponPoint.x, weaponPoint.y, 'tiles_spr', 50).setScale(1.5),
    );
    weapons.forEach((weapon) => {
      this.physics.add.overlap(this.player, weapon, (_, obj2) => {
        this.player.equipWeapon(WEAPONS.daggers['1']);
        obj2.destroy();
      });
    });
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  private initEnemies(): void {
    const enemiesPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies-lv1', (obj) => obj.name === 'EnemyPoint'),
    );
    this.enemies = enemiesPoints.map((enemyPoint) =>
      new Enemy(
        this,
        enemyPoint.x,
        enemyPoint.y,
        'middle_characters_spr',
        this.player,
        ENEMY_CONFIG.orcs['1'],
      )
        .setName(enemyPoint.id.toString())
        .setScale(1.5),
    );
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (_, obj2) => {
      (obj2 as Enemy).attacks();
    });
  }
}
