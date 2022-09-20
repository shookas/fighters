import { Scene, Tilemaps } from 'phaser';
import { EnemyFactory } from '../../../src/enemy/EnemyFactory';
import { ENEMY_CONFIG, EVENTS_NAME, WEAPONS } from '../../consts';
import { Enemy } from '../../enemy/Enemy';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { Player } from '../../player/Player';
export class Level2 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private doors!: Tilemaps.Tile[];
  private chests!: Phaser.GameObjects.Sprite[];
  private enemies!: Enemy[];

  constructor() {
    super('level-2-scene');
  }
  create(): void {
    this.initMap();
    this.player = new Player(this, 1030, 1355);
    this.initChests();
    this.initCamera();
    this.initEnemies();
    this.initLoot();
    this.registry.set('level', 2);
    this.physics.add.collider(this.player, this.wallsLayer);
    this.player.equipWeapon(WEAPONS.daggers['1']);
  }

  update(): void {
    this.player.update();
    this.enemies.forEach((enemy) => enemy.update());
  }

  private initMap(): void {
    this.map = this.make.tilemap({ key: 'level2', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('level2', 'tiles');
    this.map.createLayer('Ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.doors = this.wallsLayer.filterTiles((tile: Phaser.Tilemaps.Tile) => tile.properties.door);
    this.doors.forEach(
      (door) =>
        (door.collisionCallback = () => {
          this.openDoors();
        }),
    );

    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
    process.env.NODE_ENV === 'dev' && this.showDebugWalls();
  }

  private openDoors() {
    this.doors.forEach((tile) => {
      this.map.replaceByIndex(tile.index, tile.index + 3);
      tile.resetCollision();
      tile.collisionCallback = () => {};
    });
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
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
        this.game.events.emit(EVENTS_NAME.chestLoot, chestPoints.length * 10);
        obj2.destroy();
        this.cameras.main.flash();
      });
    });
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  private initEnemies(): void {
    const findEnemyLevel = (enemyPoint: any) => {
      return (
        (enemyPoint.properties?.find(
          (prop: { name: string; value: string | number }) => prop.name === 'level',
        )?.value as string) || '1'
      );
    };
    const orcsObjects = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies-orcs', (obj) => obj.name === 'EnemyPoint'),
    );
    const rootsObjects = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies-zombies', (obj) => obj.name === 'EnemyPoint'),
    );
    const orcsEnemies = orcsObjects.map((enemyPoint) => {
      const enemyLevel = findEnemyLevel(enemyPoint);
      let enemyConfig = ENEMY_CONFIG.orcs[enemyLevel];
      return EnemyFactory.createEnemy(this, enemyPoint, this.player, enemyConfig);
    });
    const zombiesEnemies = rootsObjects.map((enemyPoint) => {
      const enemyLevel = findEnemyLevel(enemyPoint);
      let enemyConfig = ENEMY_CONFIG.zombies[enemyLevel];
      return EnemyFactory.createEnemy(this, enemyPoint, this.player, enemyConfig);
    });
    this.enemies = [...orcsEnemies, ...zombiesEnemies];
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (_, obj) => {
      (obj as Enemy).attacks();
    });
  }

  private initLoot() {
    // this.player.equipShield();
    const lootPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Loot', (obj) => obj.name === 'LootPoint'),
    );
    const shield = lootPoints.map((lootPoint) =>
      this.physics.add.sprite(lootPoint.x, lootPoint.y, 'shield-tile', 1).setScale(1.5),
    )[0];
    this.physics.add.overlap(this.player, shield, (player, obj2): void => {
      console.log('shield equipped');
      (player as Player).equipShield();
      obj2.destroy();
      this.cameras.main.flash();
    });
  }
}
