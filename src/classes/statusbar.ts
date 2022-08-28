import { GameObjects, Scene } from 'phaser';
export class StatusBar extends GameObjects.Graphics {
  constructor(scene: Scene, value: number) {
    super(scene);
    scene.add.existing(this);
    this.rerender(value);
  }

  update(value: number, color?: number) {
    this.rerender(value, color);
  }

  private rerender(value: number, color?: number) {
    const fillColor = color ? color : 0x2ecc71;
    this.clear();
    this.fillStyle(fillColor, 0.8);
    this.fillRect(0, 0, value, 10);
  }
}
