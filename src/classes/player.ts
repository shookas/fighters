import { Input } from 'phaser';
import { EVENTS_NAME, GameStatus } from '../consts';
import { Actor } from './actor';
import { StatusBar } from './statusbar';
export class Player extends Actor {
    private keyUp: Phaser.Input.Keyboard.Key;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private hpValue: StatusBar;
    private keySpace: Input.Keyboard.Key;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'king');
        // KEYS
        this.keyUp = this.scene.input.keyboard.addKey('up');
        this.keyLeft = this.scene.input.keyboard.addKey('left');
        this.keyDown = this.scene.input.keyboard.addKey('down');
        this.keyRight = this.scene.input.keyboard.addKey('right');

        this.hpValue = new StatusBar(this.scene, this.hp)
        this.keySpace = this.scene.input.keyboard.addKey(32);
        this.keySpace.on('down', (event: KeyboardEvent) => {
            this.anims.play('attack', true);
            this.scene.game.events.emit(EVENTS_NAME.attack);
        });

        // PHYSICS
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);

        this.initAnimations();

        this.on('destroy', () => {
            this.keySpace.removeAllListeners();
        });
    }
    update(): void {
        this.getBody().setVelocity(0);
        if (this.keyUp?.isDown) {
            this.body.velocity.y = -110;
            !this.anims.isPlaying && this.anims.play('run', true);
        }
        if (this.keyLeft?.isDown) {
            this.body.velocity.x = -110;
            this.checkFlip();
            this.getBody().setOffset(48, 15);
            !this.anims.isPlaying && this.anims.play('run', true);
        }
        if (this.keyDown?.isDown) {
            this.body.velocity.y = 110;
            !this.anims.isPlaying && this.anims.play('run', true);
        }
        if (this.keyRight?.isDown) {
            this.body.velocity.x = 110;
            this.checkFlip();
            this.getBody().setOffset(15, 15);
            !this.anims.isPlaying && this.anims.play('run', true);
        }
        this.hpValue.setPosition(this.x -50 , this.y - 40);
    }

    private initAnimations(): void {
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('a-king', {
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
}