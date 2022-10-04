import { Player } from '../Player';
import { MoveState } from './MoveState';

export default class MoveRightState extends MoveState {
  constructor(protected player: Player) {
    super(player);
  }

  enter() {
    this.player.body.velocity.x = this.speed + this.player.speedModificator;
    this.player.setFlipX(false);
    this.playerMoves();
  }
}
