import { Actor } from './Actor';
import GetDamage from './states/GetDamageState';
import HealState from './states/HealState';

export enum ACTOR_STATES {
  getDamage = 'getDamage',
  heal = 'heal',
}
export default class ActorController {
  states: { [key: string]: { enter: (value: number) => void } };

  currentState?: { enter: (value: number) => void };

  constructor(actor: Actor) {
    this.states = {
      getDamage: new GetDamage(actor),
      heal: new HealState(actor),
    };
  }

  setState(name: ACTOR_STATES, blockingState = false, value: number) {
    if (blockingState && this.currentState === this.states[name]) {
      return;
    }

    this.currentState = this.states[name];
    this.currentState.enter(value);
  }

  releaseState(state: ACTOR_STATES) {
    if (this.currentState === this.states[state]) {
      this.currentState = undefined;
    }
  }
}
