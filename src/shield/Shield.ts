import { Physics } from 'phaser';

export class Shield extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y + 8, texture, 1);

    scene.add.existing(this);
    this.setVisible(false);
   
    this.scene.input.on(
      'pointerdown',
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) {
          this.setVisible(true);
        }
      },
      this,
    );
    this.scene.input.on(
      'pointerup',
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonReleased()) {
          this.setVisible(false);
        }
      },
      this,
    );
  }
}
