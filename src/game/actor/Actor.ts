import { Physics } from 'phaser';
import { tossACoin } from '../helpers/chaosMonkey';
import ActorController, { ACTOR_STATES } from './ActorController';
export class Actor extends Physics.Arcade.Sprite {
  protected hp = 100;

  private actorController: ActorController;
  /**
   * Probability to deflect damage 0-1
   */
  deflectionProbability = 0;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.actorController = new ActorController(this);
  }
  public getDamage(value: number): void {
    if (!tossACoin(this.deflectionProbability)) {
      this.actorController.setState(ACTOR_STATES.getDamage, false, value);
      if (value) {
        this.hp = this.hp - value;
      }
    }
  }

  public heal(value: number): void {
    this.actorController.setState(ACTOR_STATES.heal, false, value);
    this.hp = this.hp + value;
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
