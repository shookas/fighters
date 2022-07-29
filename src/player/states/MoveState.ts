import { Player } from "../Player";

export class MoveState {
    protected speed = 110;
    constructor(protected player: Player) {
    }
    playerMoves() {
        !this.player.anims.isPlaying && this.player.play('run', true);
    }
}