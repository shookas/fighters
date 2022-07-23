import { Player } from "../Player";
import { EVENTS_NAME } from "../../consts";

export class MoveState {
    protected speed = 110;
    constructor(protected player: Player) {
    }
    playerMoves() {
        this.player.scene.game.events.emit(EVENTS_NAME.playerMoves);
        !this.player.anims.isPlaying && this.player.play('run', true);
    }
}