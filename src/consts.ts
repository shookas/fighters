import { EnemyConfig } from './enemy/Enemy';

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

export const texturesSizes = {
  small: 'tiles_spr',
  medium: 'middle_characters_spr',
  large: 'large_characters_spr'
}

export const ENEMY_CONFIG: { [key: string]: { [key: string]: EnemyConfig } } = {
  orcs: {
    1: {
      startingFrame: 87,
      runAnimationKey: 'a-enemy-orc-1',
      initialHp: 1,
      power: 1,
      attackDuration: 300,
      size: 'small',
    },
    2: {
      startingFrame: 183,
      runAnimationKey: 'a-enemy-orc-2',
      initialHp: 2,
      power: 2,
      attackDuration: 500,
      size: 'medium',
    },
    3: {
      startingFrame: 215,
      runAnimationKey: 'a-enemy-orc-3',
      initialHp: 2,
      power: 2,
      attackDuration: 500,
      size: 'medium',
    },
    4: {
      startingFrame: 247,
      runAnimationKey: 'a-enemy-orc-4',
      initialHp: 2,
      power: 2,
      attackDuration: 500,
      size: 'medium',
    },
    5: {
      startingFrame: 90,
      runAnimationKey: 'a-enemy-orc-5',
      initialHp: 5,
      power: 3,
      attackDuration: 500,
      size: 'large',
    },
  },
  zombies: {
    1: {
      startingFrame: 55,
      runAnimationKey: 'a-enemy-zombi-1',
      initialHp: 1,
      power: 2,
      attackDuration: 700,
      size: 'small',
    },
    2: {
      startingFrame: 151,
      runAnimationKey: 'a-enemy-zombi-2',
      initialHp: 4,
      power: 3,
      attackDuration: 700,
      size: 'medium',
    },
    3: {
      startingFrame: 75,
      runAnimationKey: 'a-enemy-zombi-3',
      initialHp: 2,
      power: 2,
      attackDuration: 500,
      size: 'large',
    },
  },
  demons: {
    3: {
      startingFrame: 343,
      runAnimationKey: 'a-enemy-demon-3',
      initialHp: 5,
      power: 5,
      attackDuration: 300,
      size: 'medium',
    },
    4: {
      startingFrame: 105,
      runAnimationKey: 'a-enemy-demon-4',
      initialHp: 5,
      power: 5,
      attackDuration: 300,
      size: 'large',
    },
  },
};
