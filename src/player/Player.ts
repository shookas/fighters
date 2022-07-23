import { Input } from 'phaser';
import PlayerController, { MOVE_STATES } from './PlayerController';
import { EVENTS_NAME, GameStatus } from '../consts';
import { Actor } from '../classes/actor';
import { StatusBar } from '../classes/statusbar';
import { Weapon } from '../classes/weapon';

export class Player extends Actor {
    private damageModificator = 1;
    private keyUp: Phaser.Input.Keyboard.Key;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private hpValue: StatusBar;
    private weapon?: Weapon;
    private keySpace: Input.Keyboard.Key;
    private playerController: PlayerController;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'characters_spr', 104);
        this.playerController = new PlayerController(this)
        // KEYS
        this.keyUp = this.scene.input.keyboard.addKey('up');
        this.keyLeft = this.scene.input.keyboard.addKey('left');
        this.keyDown = this.scene.input.keyboard.addKey('down');
        this.keyRight = this.scene.input.keyboard.addKey('right');

        this.hpValue = new StatusBar(this.scene, this.hp)
        this.keySpace = this.scene.input.keyboard.addKey(32);
        this.keySpace.on('down', (event: KeyboardEvent) => {
            this.hitStright()
            this.scene.game.events.emit(EVENTS_NAME.attack, this.damageModificator);
        });

        this.setPlayerPhisics()

        this.initAnimations();

        this.on('destroy', () => {
            this.keySpace.removeAllListeners();
        });
    }

    private hitStright() {
        this.scene.tweens.timeline({
            targets: this.weapon,
            ease: Phaser.Math.Easing.Cubic.In,
            duration: 100,
            tweens: [
                {
                    x: this.x + 10,
                    yoyo: true
                },
            ]
        });
    }

    update(): void {
        this.playerController.setState(MOVE_STATES.idle, true)
        if (this.keyUp?.isDown) {
            this.playerController.setState(MOVE_STATES.moveUp)
            this.weapon?.setPosition(this.x + 10, this.y + 10)
            this.weapon?.flipY ? this.weapon?.setPosition(this.x - 10, this.y + 10) : this.weapon?.setPosition(this.x + 10, this.y + 10)
        }
        if (this.keyLeft?.isDown) {
            this.playerController.setState(MOVE_STATES.moveLeft)
            this.checkFlip();
            this.weapon?.setPosition(this.x - 10, this.y + 10)
            this.weapon?.setFlipY(true);
        }
        if (this.keyDown?.isDown) {
            this.playerController.setState(MOVE_STATES.moveDown)
            this.weapon?.flipY ? this.weapon?.setPosition(this.x - 10, this.y + 10) : this.weapon?.setPosition(this.x + 10, this.y + 10)
        }
        if (this.keyRight?.isDown) {
            this.playerController.setState(MOVE_STATES.moveRight)
            this.checkFlip();
            this.weapon?.setPosition(this.x + 10, this.y + 10)
            this.weapon?.setFlipY(false);
        }
        this.hpValue.setPosition(this.x - 50, this.y - 40);

    }

    equipWeapon() {
        this.weapon = new Weapon(this.scene, this.x, this.y, 'tiles_spr', 50)
    }

    private initAnimations(): void {
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('a-knight', {
                prefix: 'run-',
                end: 7,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'attack',
            frames: this.scene.anims.generateFrameNames('a-king', {
                prefix: 'attack-',
                end: 2,
            }),
            frameRate: 8,
        });
    }

    public getDamage(value?: number): void {
        super.getDamage(value);
        if (this.hp <= 50) {
            this.hpValue.update(this.hp, 0xe74c3c);
        } else {
            this.hpValue.update(this.hp);
        }
        if (this.hp <= 0) {
            this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
        }
    }

    public setPlayerPhisics() {
        this.setDepth(0)
        this.getBody().setSize(16, 16);
    }
}