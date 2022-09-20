import { Actor } from '../actor/Actor';
import { EVENTS_NAME } from '../consts';
import { Player } from '../player/Player';
import EnemyController, { ENEMY_STATES } from './EnemyController';

export interface EnemyConfig {
  startingFrame: number;
  runAnimationKey: string;
  initialHp: number;
  power: number;
  attackDuration: number;
  size: EnemySize;
  speed: number;
}
export type EnemySize = 'small' | 'medium' | 'large';

export class Enemy extends Actor {
  public target: Player;
  private AGRESSOR_RADIUS = 100;
  private attackHandler: (x: number, y: number, damage: number) => void;
  public enemyController: EnemyController;
  private touchingPlayer?: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    public config: EnemyConfig,
  ) {
    super(scene, x, y, texture, config.startingFrame);
    super.setHPValue(config.initialHp);
    this.target = target;
    // ADD TO SCENE
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.enemyController = new EnemyController(this);
    // PHYSICS MODEL
    this.setPhisics();

    this.initAnimations();

    this.attackHandler = (x: number, y: number, damage: number) => {
      if (this.getBounds().contains(x, y)) {
        this.getDamage(damage);
        if (!this.hp) {
          this.disableBody(true, false);
          this.scene.time.delayedCall(300, () => {
            this.destroy();
          });
        }
      }
    };

    // EVENTS
    this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on('destroy', () => {
      this.target.setVelocity(0);
      this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.touchingPlayer = false;
  }

  public update(): void {
    if (this.getBody()) {
      this.enemyFolows();
    }
  }

  public attacks() {
    this.enemyController.setState(ENEMY_STATES.attack, true);
    this.touchingPlayer = true;
  }

  public initAnimations(): void {
    this.scene.anims.create({
      key: this.config.runAnimationKey,
      frames: this.scene.anims.generateFrameNames(this.config.runAnimationKey, {
        prefix: 'run-',
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  private setPhisics() {
    this.height = 16;
    this.getBody().setSize(16, 16);
    if (this.config.size === 'medium') {
      this.getBody().setOffset(0, 16);
    } else if (this.config.size === 'large') {
      this.getBody().setSize(32, 32);
      this.getBody().setOffset(0, 16);
    }
  }

  private enemyFolows() {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.AGRESSOR_RADIUS
    ) {
      !this.anims.isPlaying && this.play(this.config.runAnimationKey, true);
      if (!this.touchingPlayer) {
        this.getBody().setVelocityX((this.target.x - this.x) * this.config.speed);
        this.getBody().setVelocityY((this.target.y - this.y) * this.config.speed);
      }
    } else {
      this.getBody().setVelocity(0);
      this.anims.stop();
    }
  }
}
