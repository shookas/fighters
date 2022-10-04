import { Scene } from 'phaser';
import { texturesSizes } from '../consts';
import { Player } from '../player/Player';
import { Enemy, EnemyConfig } from './Enemy';

export class EnemyFactory {
  public static createEnemy(
    scene: Scene,
    objectPoint: ObjectPoint,
    target: Player,
    config: EnemyConfig,
  ) {
    const texture = texturesSizes[config.size];
    return new Enemy(scene, objectPoint.x, objectPoint.y, texture, target, config).setName(
      objectPoint.id.toString(),
    );
  }
}
