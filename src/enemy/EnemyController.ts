import { Enemy } from './Enemy';
import AttackState from './states/AttackState';

export enum ENEMY_STATES {
  attack = 'attack',
}
export default class EnemyController {
  states: { [key: string]: { enter: () => void } };

  currentState?: { enter: () => void };

  constructor(enemy: Enemy) {
    this.states = {
      attack: new AttackState(enemy),
    };
  }

  setState(name: ENEMY_STATES, blockingState = false) {
    if (blockingState && this.currentState === this.states[name]) {
      return;
    }

    this.currentState = this.states[name];
    this.currentState.enter();
  }

  releaseState(state: ENEMY_STATES) {
    if (this.currentState === this.states[state]) {
      this.currentState = undefined;
    }
  }
}
