import { Physics } from 'phaser';
import { Actor } from '../Actor';

export default class HitState {
  private hitSpite: Physics.Arcade.Sprite;
  constructor(protected actor: Actor) {
    this.actor.scene.anims.create({
      key: 'hit',
      frames: this.actor.scene.anims.generateFrameNames('a-hit01', {
        prefix: 'hit-',
        end: 9,
      }),
      duration: 200,
    });
    this.hitSpite = new Physics.Arcade.Sprite(this.actor.scene, this.actor.x, this.actor.y, '');
    this.actor.scene.add.existing(this.hitSpite);
    this.hitSpite.setVisible(false);
    this.hitSpite.on('animationcomplete', () => {
      this.hitSpite.setVisible(false);
    });
  }

  enter() {
    this.hitSpite.setPosition(this.actor.x, this.actor.y);
    this.hitSpite.setVisible(true);
    this.hitSpite.play('hit', true).setScale(0.5);
    this.actor.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onComplete: () => {
        this.actor.setAlpha(1);
      },
    });
  }
}
