import { Scene } from 'phaser';
import { EVENTS_NAME, GameStatus } from '../../consts';
import { Score, ScoreOperations } from '../../classes/score';
import { Text } from '../../classes/text';
import { gameConfig } from '../../index';
export class UIScene extends Scene {
    private score!: Score;
    private gameEndPhrase!: Text;
    private gameEndHandler: (status: GameStatus) => void;
    private nextLevelHandler: (levelFinished: number) => void;
    private chestLootHandler: () => void;
    constructor() {
        super('ui-scene');
        this.chestLootHandler = () => {
            this.score.changeValue(ScoreOperations.INCREASE, 10);
            if (this.score.getValue() === gameConfig.winScore) {
                const finishedLevel = this.game.scene.getScenes().filter(Boolean).find(scene => scene.scene.isActive() && scene.registry.get('level'));
                this.score.changeValue(ScoreOperations.SET_VALUE, 0);
                if (finishedLevel) {
                    this.game.events.emit(EVENTS_NAME.nextLevel, finishedLevel?.registry.get('level'));
                } else {
                    this.game.events.emit(EVENTS_NAME.gameEnd)
                }
            }
        }

        this.gameEndHandler = (status) => {
            this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
            this.game.scene.pause('level-1-scene');
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
                this.clearListeners()
                this.scene.get('level-1-scene').scene.restart();
                this.scene.restart();
            });
        }

        this.nextLevelHandler = (levelFinished) => {
            this.scene.get(`level-${levelFinished}-scene`).scene.stop();
            this.scene.get(`level-${levelFinished + 1}-scene`).scene.start();
        }
    }
    create(): void {
        this.score = new Score(this, 20, 20, 0);
        this.initListeners();
    }

    private initListeners(): void {
        this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
        this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
        this.game.events.once(EVENTS_NAME.nextLevel, this.nextLevelHandler, this);
    }
    
    private clearListeners() {
        this.game.events.off(EVENTS_NAME.chestLoot, this.chestLootHandler);
        this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
        this.game.events.off(EVENTS_NAME.nextLevel, this.nextLevelHandler);
    }
}