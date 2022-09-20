import { Physics } from 'phaser';
import { getRandomInt } from '../../../src/helpers/chaosMonkey';
import { EVENTS_NAME } from '../../consts';
import { Weapon } from '../Weapon';
import { HIT_STATES } from '../WeaponController';

export default class HitState {
  private hitSpite: Physics.Arcade.Sprite;
  constructor(protected weapon: Weapon) {
    this.weapon.scene.anims.create({
      key: 'hit-weapon',
      frames: this.weapon.scene.anims.generateFrameNames('a-hit03', {
        prefix: 'hit-',
        end: 9,
      }),
      duration: 200,
    });
    this.hitSpite = new Physics.Arcade.Sprite(this.weapon.scene, 0, 0, '');
    this.weapon.scene.add.existing(this.hitSpite);
    this.hitSpite.setVisible(false);
    this.hitSpite.on('animationcomplete', () => {
      this.hitSpite.setVisible(false);
    });
  }

  enter() {
    let angle = Phaser.Math.Angle.Between(
      this.weapon.x,
      this.weapon.y,
      this.weapon.scene.input.x + this.weapon.scene.cameras.main.scrollX,
      this.weapon.scene.input.y + this.weapon.scene.cameras.main.scrollY,
    );
    const hitPositionX = Math.cos(angle) * this.weapon.config.range + this.weapon.x;
    const hitPositionY = Math.sin(angle) * this.weapon.config.range + this.weapon.y;
    this.hitSpite.setPosition(hitPositionX, hitPositionY);
    this.hitSpite.setVisible(true);
    this.hitSpite.play('hit-weapon', true).setScale(0.3);
    this.weapon.scene.game.events.emit(
      EVENTS_NAME.attack,
      hitPositionX,
      hitPositionY,
      getRandomInt(this.weapon.config.damage),
    );
    setTimeout(() => {
      this.weapon.weaponController.releaseState(HIT_STATES.hit);
    }, this.weapon.config.duration);
  }
}
