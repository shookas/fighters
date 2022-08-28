import { Actor } from './Actor';
import GetDamage from './states/GetDamageState';

export enum ACTOR_STATES {
  getDamage = 'getDamage',
}
export default class ActorController {
  states: { [key: string]: { enter: () => void } };

  currentState?: { enter: () => void };

  constructor(actor: Actor) {
    this.states = {
      getDamage: new GetDamage(actor),
    };
  }

  setState(name: ACTOR_STATES, blockingState = false) {
    if (blockingState && this.currentState === this.states[name]) {
      return;
    }

    this.currentState = this.states[name];
    this.currentState.enter();
  }

  releaseState(state: ACTOR_STATES) {
    if (this.currentState === this.states[state]) {
      this.currentState = undefined;
    }
  }
}
