import { EnemyConfig } from "./enemy/Enemy";

export enum EVENTS_NAME {
    gameEnd = 'game-end',
    nextLevel = 'next-level',
    chestLoot = 'chest-loot',
    attack = 'attack',
}

export enum GameStatus {
    WIN,
    LOSE,
}

export const ENEMY_CONFIG: {[key: string]: EnemyConfig} = {
    lv1: {
        startingFrame: 247,
        runAnimationKey: 'a-enemy-lv1',
        initialHp: 1,
        power: 1,
        attackDuration: 500
    },
    lv2: {
        startingFrame: 183,
        runAnimationKey: 'a-enemy-lv2',
        initialHp: 2,
        power: 2,
        attackDuration: 500
    },
    demonLv2: {
        startingFrame: 343,
        runAnimationKey: 'a-demon-lv2',
        initialHp: 5,
        power: 5,
        attackDuration: 300
    }
}