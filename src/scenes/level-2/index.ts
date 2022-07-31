import { Scene, Tilemaps } from 'phaser';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { Player } from '../../player/Player';
import { ENEMY_CONFIG, EVENTS_NAME } from '../../consts';
import { Enemy } from '../../enemy/Enemy';
import { Actor } from 'src/actor/Actor';
export class Level2 extends Scene {
    private player!: Player;
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private wallsLayer!: Tilemaps.TilemapLayer;
    private doors!: Tilemaps.Tile[];
    private groundLayer!: Tilemaps.TilemapLayer;
    private chests!: Phaser.GameObjects.Sprite[];
    private enemiesLv1!: Enemy[];
    private enemiesLv2!: Enemy[];

    constructor() {
        super('level-2-scene');
    }
    create(): void {
        this.initMap();
        this.player = new Player(this, 100, 100);
        this.initChests()
        this.initCamera()
        this.initEnemiesLv1();
        this.initEnemiesLv2();
        this.registry.set('level', 2)
        this.physics.add.collider(this.player, this.wallsLayer);
        this.player.equipWeapon(50);
    }

    update(): void {
        this.player.update();
        this.enemiesLv1.forEach(enemy => enemy.update())
        this.enemiesLv2.forEach(enemy => enemy.update())
    }

    private initMap(): void {
        this.map = this.make.tilemap({ key: 'level2', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('level2', 'tiles');
        this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
        this.wallsLayer.setCollisionByProperty({ collides: true });
        this.doors = this.wallsLayer.filterTiles((tile: Phaser.Tilemaps.Tile) => tile.properties.door);
        this.doors.forEach(door => door.collisionCallback = ((collision: Actor, tile: Phaser.Tilemaps.Tile) => {
            this.openDoors()
        }))

        this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
        process.env.NODE_ENV === 'dev' && this.showDebugWalls();
    }

    private openDoors() {
        this.doors.forEach(tile => {
            this.map.replaceByIndex(tile.index, tile.index + 3)
            tile.resetCollision()
            tile.collisionCallback = () => { };
        })

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
            this.map.filterObjects('Chests', obj => obj.name === 'ChestPoint'),
        );
        this.chests = chestPoints.map(chestPoint =>
            this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(1.5),
        );
        this.chests.forEach(chest => {
            this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
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

    private initEnemiesLv1(): void {
        const enemiesPointsLv1 = gameObjectsToObjectPoints(
            this.map.filterObjects('Enemies-lv1', (obj) => obj.name === 'EnemyPoint'),
        );
        this.enemiesLv1 = enemiesPointsLv1.map((enemyPoint) =>
            new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, ENEMY_CONFIG.lv1)
                .setName(enemyPoint.id.toString())
                .setScale(1.5),
        );
        this.physics.add.collider(this.enemiesLv1, this.wallsLayer);
        this.physics.add.collider(this.enemiesLv1, this.enemiesLv1);
        this.physics.add.collider(this.player, this.enemiesLv1, (obj1, obj2) => {
            (obj1 as Player).getDamage(1);
        });
    }
    private initEnemiesLv2(): void {
        const enemiesPointsLv1 = gameObjectsToObjectPoints(
            this.map.filterObjects('Enemies-lv2', (obj) => obj.name === 'EnemyPoint'),
        );
        this.enemiesLv2 = enemiesPointsLv1.map((enemyPoint) =>
            new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, ENEMY_CONFIG.lv2)
                .setName(enemyPoint.id.toString())
                .setScale(1.5),
        );
        this.physics.add.collider(this.enemiesLv2, this.wallsLayer);
        this.physics.add.collider(this.enemiesLv2, this.enemiesLv2);
        this.physics.add.collider(this.player, this.enemiesLv2, (obj1, obj2) => {
            (obj2 as Enemy).attacks();
        });
    }

}