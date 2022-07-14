import { Physics } from 'phaser';
export class Actor extends Physics.Arcade.Sprite {
    protected hp = 100;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
    }
    public getDamage(value?: number): void {
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onComplete: () => {
                this.setAlpha(1);
            },
        });
        if (value) {
            this.hp = this.hp - value;
        }
    }
    public getHPValue(): number {
        return this.hp;
    }
    protected setHPValue(value: number) {
        this.hp = value;
    }
    protected checkFlip(): void {
        if (this.body.velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }
    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}