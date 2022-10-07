import { Player } from './Player';
import IdleState from './states/IdleState';
import MoveDownState from './states/MoveDownState';
import MoveLeftState from './states/MoveLeftState';
import MoveRightState from './states/MoveRightState';
import MoveUpState from './states/MoveUpState';

export enum PLAYER_STATES {
  moveLeft = 'moveLeft',
  moveRight = 'moveRight',
  moveDown = 'moveDown',
  moveUp = 'moveUp',
  idle = 'idle',
}
export default class PlayerController {
  states: { [key: string]: { enter: () => void } };

  currentState!: { enter: () => void };

  constructor(player: Player) {
    this.states = {
      moveLeft: new MoveLeftState(player),
      moveRight: new MoveRightState(player),
      moveDown: new MoveDownState(player),
      moveUp: new MoveUpState(player),
      idle: new IdleState(player),
    };
  }

  setState(name: PLAYER_STATES, blockingState = false) {
    if (blockingState && this.currentState === this.states[name]) {
      return;
    }

    this.currentState = this.states[name];
    this.currentState.enter();
  }
}
