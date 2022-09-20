import { GameObjects, Scene } from 'phaser';
export class StatusBar extends GameObjects.Graphics {
  p = 76 / 100;
  constructor(scene: Scene, value: number) {
    super(scene);
    scene.add.existing(this);
    this.rerender(value);
  }

  update(value: number) {
    if (value < 0) {
      value = 0;
    }
    this.rerender(value);
    return value === 0;
  }

  private rerender(value: number) {
    this.clear();

    //  BG
    this.fillStyle(0x000000);
    this.fillRect(this.x, this.y, 80, 16);

    //  Health
    this.fillStyle(0xffffff);
    this.fillRect(2, 2, 76, 12);

    if (value < 30) {
      this.fillStyle(0xff0000);
    } else {
      this.fillStyle(0x00ff00);
    }

    var d = Math.floor(this.p * value);

    this.fillRect(2, 2, d, 12);
  }
}
