import { Scene, Tilemaps } from 'phaser';
import { ENEMY_CONFIG, EVENTS_NAME } from '../../consts';
import { Enemy } from '../../enemy/Enemy';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { Player } from '../../player/Player';
export class Lseg extends Scene {
    private player!: Player;
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private wallsLayer!: Tilemaps.TilemapLayer;
    private doors!: Tilemaps.Tile[];
    private chests!: Phaser.GameObjects.Sprite[];
    private enemies!: Enemy[];

    constructor() {
        super('lseg-scene');
    }
    create(): void {
        this.initMap();
        this.player = new Player(this, 220, 640);
        this.initChests()
        this.initCamera()
        this.initWeapons();
        this.initEnemies();
        this.registry.set('level', 2)
        this.physics.add.collider(this.player, this.wallsLayer);
    }

    update(): void {
        this.player.update();
        this.enemies.forEach(enemy => enemy.update())
    }

    private initMap(): void {
        this.map = this.make.tilemap({ key: 'lseg', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('lseg', 'tiles');
        this.map.createLayer('Ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
        this.wallsLayer.setCollisionByProperty({ collides: true });
        this.doors = this.wallsLayer.filterTiles((tile: Phaser.Tilemaps.Tile) => tile.properties.door);
        this.doors.forEach(door => door.collisionCallback = (() => {
            this.openDoors()
        }))

        this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
    }

    private openDoors() {
        this.doors.forEach(tile => {
            this.map.replaceByIndex(tile.index, tile.index + 3)
            tile.resetCollision()
            tile.collisionCallback = () => { };
        })

    }

    private initWeapons(): void {
        const weaponPoints = gameObjectsToObjectPoints(
            this.map.filterObjects('Weapon', obj => obj.name === 'WeaponPoint'),
        );
        const weapons = weaponPoints.map(weaponPoint =>
            this.physics.add.sprite(weaponPoint.x, weaponPoint.y, 'tiles_spr', 50).setScale(1.5),
        );
        weapons.forEach(weapon => {
            this.physics.add.overlap(this.player, weapon, (_, obj2) => {
                this.openDoors()
                this.player.equipWeapon(weapon.frame.name)
                obj2.destroy();
            });
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
        const enemiesLv1 = gameObjectsToObjectPoints(
            this.map.filterObjects('Enemies-lv1', (obj) => obj.name === 'EnemyPoint'),
        ).map((enemyPoint) =>
            new Enemy(this, enemyPoint.x, enemyPoint.y, 'middle_characters_spr', this.player, ENEMY_CONFIG.lv1)
                .setName(enemyPoint.id.toString())
                .setScale(1.5),
        );

        const enemiesLv2 = gameObjectsToObjectPoints(
            this.map.filterObjects('Enemies-lv2', (obj) => obj.name === 'EnemyPoint'),
        ).map((enemyPoint) =>
            new Enemy(this, enemyPoint.x, enemyPoint.y, 'middle_characters_spr', this.player, ENEMY_CONFIG.lv2)
                .setName(enemyPoint.id.toString())
                .setScale(1.5),
        );
        const demonsLv2 = gameObjectsToObjectPoints(
            this.map.filterObjects('Demons-lv2', (obj) => obj.name === 'EnemyPoint'),
        ).map((enemyPoint) =>
            new Enemy(this, enemyPoint.x, enemyPoint.y, 'middle_characters_spr', this.player, ENEMY_CONFIG.demonLv2)
                .setName(enemyPoint.id.toString())
                .setScale(1.5),
        );

        this.enemies = [...enemiesLv1, ...enemiesLv2, ...demonsLv2]
        this.physics.add.collider(this.enemies, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.enemies, (_, enemy) => {
            (enemy as Enemy).attacks();
        });
    }

}