import { createStore } from '../../store';
import { Store } from '../../store/createStore';
import { State } from '../../store/reducer';
import { Actor } from '../actor/Actor';
import { EVENTS_NAME, GameStatus } from '../consts';
import { Shield } from '../shield/Shield';
import { Weapon, WeaponConfig } from '../weapon/Weapon';
import PlayerController, { PLAYER_STATES } from './PlayerController';

export class Player extends Actor {
  private keyUp: Phaser.Input.Keyboard.Key;
  private keyLeft: Phaser.Input.Keyboard.Key;
  private keyDown: Phaser.Input.Keyboard.Key;
  private keyRight: Phaser.Input.Keyboard.Key;
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keySHIFT: Phaser.Input.Keyboard.Key;
  public weapon?: Weapon;
  public shield?: Shield;
  public speedModificator = -25;
  protected stamina = 100;
  private looseStaminaToken?: NodeJS.Timer;
  private gainStaminaToken!: NodeJS.Timer;
  private store: Store;

  private _shieldOn = false;
  public set shieldOn(isOn: boolean) {
    this.gainStamina();
    if (isOn) {
      this.speedModificator = -50;
      this.deflectionProbability = 0.5;
      this.looseStaminaToken = this.looseStamina();
    } else {
      this.speedModificator = -25;
      this.deflectionProbability = 0;
      clearTimeout(this.looseStaminaToken!);
    }
    this._shieldOn = isOn;
  }

  public get shieldOn(): boolean {
    return this._shieldOn;
  }

  private playerController: PlayerController;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'middle_characters_spr', 104);
    this.store = createStore();
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
    this.keySHIFT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.setPlayerPhisics();

    this.initAnimations();
    this.observe();
  }

  update(): void {
    this.playerController.setState(PLAYER_STATES.idle, true);
    if (this.keyUp.isDown || this.keyW.isDown) {
      this.playerController.setState(PLAYER_STATES.moveUp);
    }
    if (this.keyLeft.isDown || this.keyA.isDown) {
      this.playerController.setState(PLAYER_STATES.moveLeft);
    }
    if (this.keyDown.isDown || this.keyS.isDown) {
      this.playerController.setState(PLAYER_STATES.moveDown);
    }
    if (this.keyRight.isDown || this.keyD.isDown) {
      this.playerController.setState(PLAYER_STATES.moveRight);
    }
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
        if (pointer.button === 2) {
          this.useShield(true);
        }
      },
      this,
    );
    this.scene.input.on(
      'pointerup',
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.button === 2) {
          this.useShield(false);
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
    this.scene.game.events.emit(EVENTS_NAME.updateHp, this.hp <= 0 ? 0 : this.hp);
    if (this.hp <= 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
    }
  }

  public heal(value: number) {
    const valueToAdd = this.hp + value >= 100 ? 100 - this.hp : value;
    super.heal(valueToAdd);
    this.scene.game.events.emit(EVENTS_NAME.updateHp, this.hp);
  }

  private restoreStamina(value: number) {
    const valueToAdd = this.stamina + value >= 100 ? 100 - this.stamina : value;
    this.stamina = this.stamina + valueToAdd;
    this.scene.game.events.emit(EVENTS_NAME.updateStamina, this.stamina);
  }

  public setPlayerPhisics() {
    this.setDepth(0);
    this.getBody().setSize(16, 16);
  }

  private looseStamina(): NodeJS.Timer | undefined {
    clearTimeout(this.gainStaminaToken);
    this.gainStaminaToken = null as unknown as NodeJS.Timer;
    if (!this.looseStaminaToken) {
      return setInterval(() => {
        this.stamina = this.stamina <= 0 ? 0 : this.stamina - 1;
        this.scene.game.events.emit(EVENTS_NAME.updateStamina, this.stamina);
        if (this.stamina <= 0) {
          this.useShield(false);
        }
      }, 200);
    }
  }
  private gainStamina() {
    clearTimeout(this.looseStaminaToken);
    this.looseStaminaToken = null as unknown as NodeJS.Timer;
    if (!this.gainStaminaToken) {
      this.gainStaminaToken = setInterval(() => {
        if (this.stamina < 100) {
          this.stamina = this.stamina + 1;
          this.scene.game.events.emit(EVENTS_NAME.updateStamina, this.stamina);
        } else {
          clearTimeout(this.gainStaminaToken);
          this.gainStaminaToken = null as unknown as NodeJS.Timer;
        }
      }, 500);
    }
  }

  private useShield(inUse: boolean) {
    this.shieldOn = inUse;
    this.shield?.setVisible(inUse);
    this.weapon!.disabled = inUse;
  }

  private observe() {
    this.store.subscribe(
      (state: State, oldState: State) => {
        if (state.hpPoitions?.length < oldState.hpPoitions?.length) {
          this.heal(20);
        }
        if (state.staminaPoitions?.length < oldState.staminaPoitions?.length) {
          this.restoreStamina(20);
        }
      },
      ['hpPoitions', 'staminaPoitions'],
    );

    this.keySHIFT.on('down', () => {
      if (!this.shieldOn) {
        this.speedModificator = 0;
        this.looseStaminaToken = this.looseStamina();
      }
    });
    this.keySHIFT.on('up', () => {
      if (!this.shieldOn) {
        this.speedModificator = -35;
        this.gainStamina();
        clearTimeout(this.looseStaminaToken!);
      }
    });
  }
}
