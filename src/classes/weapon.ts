import { Physics } from 'phaser';
export class Weapon extends Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.angle = 90
    }

    update(value: number, color?: number) {
    }
}