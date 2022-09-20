import { Physics } from 'phaser';

export class Shield extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y + 8, texture, 1);

    scene.add.existing(this);
    this.setVisible(false);
  }
}
