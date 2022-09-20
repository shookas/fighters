import { getRandomInt } from '../../../src/helpers/chaosMonkey';
import { Enemy } from '../Enemy';
import { ENEMY_STATES } from '../EnemyController';

export default class AttackState {
  constructor(protected enemy: Enemy) {}

  enter() {
    this.enemy.target.getDamage(getRandomInt(this.enemy.config.power));
    setTimeout(() => {
      this.enemy.enemyController.releaseState(ENEMY_STATES.attack);
    }, this.enemy.config.attackDuration);
  }
}
