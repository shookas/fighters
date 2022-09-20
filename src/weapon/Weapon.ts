import { Physics } from 'phaser';
import WeaponController, { HIT_STATES } from './WeaponController';

export interface WeaponConfig {
  range: number;
  duration: number;
  damage: [number, number];
  frame: number;
}

export class Weapon extends Physics.Arcade.Sprite {
  weaponController: WeaponController;
  config: WeaponConfig;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, config: WeaponConfig) {
    const frame = config.frame
    super(scene, x, y, texture, frame);
    this.config = config;

    scene.add.existing(this);
    this.angle = 90;
    this.weaponController = new WeaponController(this);
  }

  update() {
    let angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.input.x + this.scene.cameras.main.scrollX,
      this.scene.input.y + this.scene.cameras.main.scrollY,
    );
    this.setOrigin(0.5, 1);
    this.setRotation(angle + Math.PI / 2);
    if (this.scene.input.mousePointer.isDown) {
      this.weaponController.setState(HIT_STATES.hit, true);
    }
  }
}
