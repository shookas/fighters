import { EnemyConfig } from "./classes/enemy";

export enum EVENTS_NAME {
    gameEnd = 'game-end',
    nextLevel = 'next-level',
    chestLoot = 'chest-loot',
    attack = 'attack',
    playerMoves = 'playerMoves',
}

export enum GameStatus {
    WIN,
    LOSE,
}

export const ENEMY_CONFIG: {[key: string]: EnemyConfig} = {
    lv1: {
        startingFrame: 503,
        runAnimationKey: 'a-enemy-lv1',
        initialHp: 1
    },
    lv2: {
        startingFrame: 375,
        runAnimationKey: 'a-enemy-lv2',
        initialHp: 2
    }
}