import { Player } from '../Player';
import { MoveState } from './MoveState';

export default class MoveUpState extends MoveState {
  constructor(protected player: Player) {
    super(player);
  }

  enter() {
    this.player.body.velocity.y = -this.speed - this.player.speedModificator;
    this.playerMoves();
  }
}
