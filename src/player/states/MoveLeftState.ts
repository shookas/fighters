import { Player } from "../Player"
import { MoveState } from "./MoveState"

export default class MoveLeftState extends MoveState {

    constructor(protected player: Player) {
        super(player)
    }

    enter() {
        this.player.body.velocity.x = -this.speed;
        this.player.body.setOffset(16, 16);
        this.playerMoves()
    }
}