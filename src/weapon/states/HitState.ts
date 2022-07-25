import { EVENTS_NAME } from "../../consts";
import { Weapon } from "../Weapon";
import { HIT_STATES } from "../WeaponController";

export default class HitState {

    constructor(protected weapon: Weapon) {
    }

    enter() {
        let angle = Phaser.Math.Angle.Between(this.weapon.x, this.weapon.y, this.weapon.scene.input.x + this.weapon.scene.cameras.main.scrollX, this.weapon.scene.input.y + this.weapon.scene.cameras.main.scrollY);
        const hitPositionX = (Math.cos(angle) * this.weapon.config.range) + this.weapon.x
        const hitPositionY = (Math.sin(angle) * this.weapon.config.range) + this.weapon.y
        // this.weapon.scene.add.circle(hitPositionX, hitPositionY, 2, 0xffff00)
        this.weapon.scene.game.events.emit(EVENTS_NAME.attack, hitPositionX, hitPositionY, this.weapon.config.damage);
        setTimeout(() => {
            this.weapon.weaponController.releaseState(HIT_STATES.hit)
        }, this.weapon.config.duration);


    }
}