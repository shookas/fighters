import { EnemyConfig } from './enemy/Enemy';
import { WeaponConfig } from './weapon/Weapon';

export enum EVENTS_NAME {
  gameEnd = 'game-end',
  nextLevel = 'next-level',
  chestLoot = 'chest-loot',
  attack = 'attack',
  updateHp = 'updateHp',
}

export enum GameStatus {
  WIN,
  LOSE,
}

export const texturesSizes = {
  small: 'tiles_spr',
  medium: 'middle_characters_spr',
  large: 'large_characters_spr',
};

export const ENEMY_CONFIG: { [key: string]: { [key: string]: EnemyConfig } } = {
  orcs: {
    1: {
      startingFrame: 87,
      runAnimationKey: 'a-enemy-orc-1',
      initialHp: 1,
      power: [1, 1],
      attackDuration: 300,
      size: 'small',
      speed: 1,
    },
    2: {
      startingFrame: 183,
      runAnimationKey: 'a-enemy-orc-2',
      initialHp: 2,
      power: [1, 2],
      attackDuration: 500,
      size: 'medium',
      speed: 1,
    },
    3: {
      startingFrame: 215,
      runAnimationKey: 'a-enemy-orc-3',
      initialHp: 2,
      power: [1, 2],
      attackDuration: 500,
      size: 'medium',
      speed: 1,
    },
    4: {
      startingFrame: 247,
      runAnimationKey: 'a-enemy-orc-4',
      initialHp: 2,
      power: [1, 2],
      attackDuration: 500,
      size: 'medium',
      speed: 1,
    },
    5: {
      startingFrame: 90,
      runAnimationKey: 'a-enemy-orc-5',
      initialHp: 5,
      power: [2, 3],
      attackDuration: 500,
      size: 'large',
      speed: 1,
    },
  },
  zombies: {
    1: {
      startingFrame: 55,
      runAnimationKey: 'a-enemy-zombi-1',
      initialHp: 2,
      power: [1, 1],
      attackDuration: 700,
      size: 'small',
      speed: 0.6,
    },
    2: {
      startingFrame: 151,
      runAnimationKey: 'a-enemy-zombi-2',
      initialHp: 3,
      power: [2, 3],
      attackDuration: 700,
      size: 'medium',
      speed: 0.6,
    },
    3: {
      startingFrame: 75,
      runAnimationKey: 'a-enemy-zombi-3',
      initialHp: 5,
      power: [4, 5],
      attackDuration: 700,
      size: 'large',
      speed: 0.6,
    },
  },
  demons: {
    3: {
      startingFrame: 343,
      runAnimationKey: 'a-enemy-demon-3',
      initialHp: 5,
      power: [5, 6],
      attackDuration: 300,
      size: 'medium',
      speed: 1,
    },
    4: {
      startingFrame: 105,
      runAnimationKey: 'a-enemy-demon-4',
      initialHp: 5,
      power: [5, 6],
      attackDuration: 300,
      size: 'large',
      speed: 1,
    },
  },
};

export const WEAPONS: { [key: string]: { [key: string]: WeaponConfig } } = {
  daggers: {
    1: {
      frame: 50,
      range: 12,
      duration: 500,
      damage: [1, 2],
    },
  },
};

export const CHESTS = {
  empty: { frame: 595, openAnimationKey: 'a-chest-emtpy' },
  full: { frame: 627, openAnimationKey: 'a-chest-full' },
  angry: { frame: 659, openAnimationKey: 'a-chest-angry' },
};
