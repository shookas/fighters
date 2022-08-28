import HitState from './states/HitState';
import IdleState from './states/IdleState';
import { Weapon } from './Weapon';

export enum HIT_STATES {
  hit = 'hit',
  idle = 'idle',
}
export default class WeaponController {
  states: { [key: string]: { enter: () => void } };

  currentState?: { enter: () => void };

  constructor(weapon: Weapon) {
    // super()
    this.states = {
      hit: new HitState(weapon),
      idle: new IdleState(weapon),
    };
  }

  setState(name: HIT_STATES, blockingState = false) {
    if (blockingState && this.currentState === this.states[name]) {
      return;
    }

    this.currentState = this.states[name];
    this.currentState.enter();
  }

  releaseState(state: HIT_STATES) {
    if (this.currentState === this.states[state]) {
      this.currentState = undefined;
    }
  }
}
