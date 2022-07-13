import { EVENTS_NAME } from '../consts';
import { Actor } from './actor';
import { Player } from './player';
export class Enemy extends Actor {
    private target: Player;
    private AGRESSOR_RADIUS = 100;
    private runAnimationKey!: string;
    private attackHandler: () => void;
    private enemyFolows: () => void;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        target: Player,
        private animationKey: string,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);
        this.target = target;
        // ADD TO SCENE
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // PHYSICS MODEL
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);
        this.initAnimations()

        this.attackHandler = () => {
            if (
                Phaser.Math.Distance.BetweenPoints(
                    { x: this.x, y: this.y },
                    { x: this.target.x, y: this.target.y },
                ) < this.target.width
            ) {
                this.getDamage();
                this.disableBody(true, false);
                this.scene.time.delayedCall(300, () => {
                    this.destroy();
                });
            }
        }

        this.enemyFolows = () => {
            if (
                Phaser.Math.Distance.BetweenPoints(
                    { x: this.x, y: this.y },
                    { x: this.target.x, y: this.target.y },
                ) < this.AGRESSOR_RADIUS
            ) {
                !this.anims.isPlaying && this.anims.play(this.animationKey, true);
                this.getBody().setVelocityX(this.target.x - this.x);
                this.getBody().setVelocityY(this.target.y - this.y);
            } else {
                this.getBody().setVelocity(0);
                this.anims.stop();
            }
        }

        // EVENTS
        this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
        this.scene.game.events.on(EVENTS_NAME.playerMoves, this.enemyFolows, this);
        this.on('destroy', () => {
            this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
            this.scene.game.events.removeListener(EVENTS_NAME.playerMoves, this.enemyFolows);
        });
    }

    public setTarget(target: Player): void {
        this.target = target;
    }

    public initAnimations(): void {
        this.scene.anims.create({
            key: this.animationKey,
            frames: this.scene.anims.generateFrameNames(this.animationKey, {
                prefix: 'run-',
                end: 7,
            }),
            frameRate: 8,
            repeat: -1
        });
    }
}