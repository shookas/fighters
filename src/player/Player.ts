import { Shield } from '../../src/shield/Shield';
import { Actor } from '../actor/Actor';
import { StatusBar } from '../classes/statusbar';
import { EVENTS_NAME, GameStatus } from '../consts';
import { Weapon, WeaponConfig } from '../weapon/Weapon';
import PlayerController, { MOVE_STATES } from './PlayerController';

export class Player extends Actor {
  private keyUp: Phaser.Input.Keyboard.Key;
  private keyLeft: Phaser.Input.Keyboard.Key;
  private keyDown: Phaser.Input.Keyboard.Key;
  private keyRight: Phaser.Input.Keyboard.Key;
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private hpValue: StatusBar;
  public weapon?: Weapon;
  public shield?: Shield;
  public speedModificator = 0;

  private _shieldOn = false;
  public set shieldOn(isOn: boolean) {
    if (isOn) {
      this.speedModificator = this.speedModificator = -50;
      this.damageModificator = -1;
    } else {
      this.speedModificator = 0;
      this.damageModificator = 0;
    }
    this._shieldOn = isOn;
  }

  public get shieldOn(): boolean {
    return this._shieldOn;
  }

  private playerController: PlayerController;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'middle_characters_spr', 104);
    this.playerController = new PlayerController(this);
    // KEYS
    this.keyUp = this.scene.input.keyboard.addKey('up');
    this.keyLeft = this.scene.input.keyboard.addKey('left');
    this.keyDown = this.scene.input.keyboard.addKey('down');
    this.keyRight = this.scene.input.keyboard.addKey('right');
    this.keyW = this.scene.input.keyboard.addKey('w');
    this.keyA = this.scene.input.keyboard.addKey('a');
    this.keyS = this.scene.input.keyboard.addKey('s');
    this.keyD = this.scene.input.keyboard.addKey('d');

    this.hpValue = new StatusBar(this.scene, this.hp);

    this.setPlayerPhisics();

    this.initAnimations();
  }

  update(): void {
    this.playerController.setState(MOVE_STATES.idle, true);
    if (this.keyUp?.isDown || this.keyW?.isDown) {
      this.playerController.setState(MOVE_STATES.moveUp);
    }
    if (this.keyLeft?.isDown || this.keyA?.isDown) {
      this.playerController.setState(MOVE_STATES.moveLeft);
    }
    if (this.keyDown?.isDown || this.keyS?.isDown) {
      this.playerController.setState(MOVE_STATES.moveDown);
    }
    if (this.keyRight?.isDown || this.keyD?.isDown) {
      this.playerController.setState(MOVE_STATES.moveRight);
    }
    this.hpValue.setPosition(this.x - 40, this.y - 40);
    this.weapon?.setPosition(this.x, this.y + 8);
    if (this.shield) {
      this.shield.setPosition(this.x, this.y + 8);
    }
    this.weapon?.update();
  }

  equipWeapon(config: WeaponConfig) {
    this.weapon = new Weapon(this.scene, this.x, this.y, 'tiles_spr', config);
  }

  equipShield() {
    this.shield = new Shield(this.scene, this.x, this.y, 'shield-tile');
    this.scene.input.on(
      'pointerdown',
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) {
          this.shieldOn = true;
          this.shield?.setVisible(true);
          this.weapon!.disabled = true;
        }
      },
      this,
    );
    this.scene.input.on(
      'pointerup',
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.button === 2) {
          this.shieldOn = false;
          this.shield?.setVisible(false);
          this.weapon!.disabled = false;
        }
      },
      this,
    );
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNames('a-knight', {
        prefix: 'run-',
        end: 7,
      }),
      frameRate: 8,
    });
  }

  public getDamage(value: number): void {
    super.getDamage(value);
    this.hpValue.update(this.hp);
    if (this.hp <= 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
    }
  }

  public setPlayerPhisics() {
    this.setDepth(0);
    this.getBody().setSize(16, 16);
  }
}
