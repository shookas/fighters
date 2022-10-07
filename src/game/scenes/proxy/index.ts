import { Scene } from 'phaser';
import { createStore } from '../../../store';
import { gainGold, gainPoition, updateHp, updateStamina } from '../../../store/actions';
import { Store } from '../../../store/createStore';
import { Text } from '../../classes/text';
import { EVENTS_NAME, GameStatus } from '../../consts';
import { PoitionConfig } from '../../poition/Poition';
export class ProxyScene extends Scene {
  private store: Store;
  private gameEndPhrase!: Text;
  private gameEndHandler: (status: GameStatus) => void;
  private nextLevelHandler: (finishedScene: Scene) => void;
  constructor() {
    super('ui-scene');
    this.store = createStore();

    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
      this.gameEndPhrase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `WASTED!\nCLICK TO RESTART`
          : `YOU ARE ROCK!\nCLICK TO RESTART`,
      )
        .setAlign('center')
        .setColor(status === GameStatus.LOSE ? '#ff0000' : '#ffffff');
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4,
      );

      this.input.on('pointerdown', () => {
        this.clearListeners();
        this.scene.get('lseg-scene').scene.restart();
        this.scene.restart();
      });
    };

    this.nextLevelHandler = (finishedScene: Scene) => {
      const finishedLevel = finishedScene?.registry.get('level') as number;
      const nextLevelScene = this.scene.get(`level-${finishedLevel + 1}-scene`);
      if (nextLevelScene) {
        finishedScene!.scene.stop();
        nextLevelScene.scene.start();
      } else {
        this.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.WIN);
      }
    };
  }
  create(): void {
    this.gameListeners();
    this.input.mouse.disableContextMenu();
  }

  private gameListeners(): void {
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
    this.game.events.on(EVENTS_NAME.nextLevel, this.nextLevelHandler, this);
    this.game.events.on(
      EVENTS_NAME.updateHp,
      (hpValue: number) => this.store.dispatch(updateHp(hpValue)),
      this,
    );
    this.game.events.on(
      EVENTS_NAME.updateStamina,
      (staminaValue: number) => this.store.dispatch(updateStamina(staminaValue)),
      this,
    );
    this.game.events.on(
      EVENTS_NAME.chestLoot,
      (value: number) => {
        this.store.dispatch(gainGold(value));
      },
      this,
    );
    this.game.events.on(
      EVENTS_NAME.getPoition,
      (poition: PoitionConfig) => {
        this.store.dispatch(gainPoition(poition));
      },
      this,
    );
  }

  private clearListeners() {
    this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
    this.game.events.off(EVENTS_NAME.nextLevel, this.nextLevelHandler);
  }
}
