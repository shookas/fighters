import { Player } from "../Player"
import { MoveState } from "./MoveState"

export default class IdleState extends MoveState {

    constructor(protected player: Player) {
        super(player);
    }

    enter() {
        this.player.setVelocity(0)
    }
}