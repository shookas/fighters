import { Actor } from '../Actor';

export default class HealState {
  constructor(protected actor: Actor) {
  }

  enter(value: number): void {
    this.showHealValue(value);
  }

  private showHealValue(value: number) {
    const text = new Phaser.GameObjects.Text(
      this.actor.scene,
      this.actor.x,
      this.actor.y,
      value.toString(),
      {
        fontSize: '10px',
        color: 'green',
        stroke: '#000',
        strokeThickness: 4,
      },
    );
    text.setOrigin(0.5, 1);
    this.actor.scene.add.existing(text);
    setTimeout(() => {
      text.destroy();
    }, 300);
  }
}
