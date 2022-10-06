import { Physics } from 'phaser';
import { Player } from '../player/Player';
import { EVENTS_NAME, texturesSizes } from '../consts';

enum PoitionSize {
  SMALL = 'small',
  BIG = 'big',
}
enum PoitionType {
  STAMINA = 'stamina',
  HP = 'hp',
}
export type PoitionConfig = { size: PoitionSize; type: PoitionType };

export class Poition extends Physics.Arcade.Sprite {
  config: PoitionConfig;
  constructor(scene: Phaser.Scene, poitionObject: ObjectPoint, player: Player) {
    super(scene, poitionObject.x, poitionObject.y + 8, texturesSizes.small);
    this.config = this.getPointionProps(poitionObject);
    this.setFrameBasedOnConfig();
    this.scene = scene;
    this.addToScene();
    this.interactWithPlayer(player);
  }

  private addToScene() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  private interactWithPlayer(player: Player) {
    this.scene.physics.add.overlap(player, this, () => {
      this.getLoot();
    });
  }

  private getLoot() {
    this.scene.game.events.emit(EVENTS_NAME.getPoition, this.config);
    this.destroy();
  }

  private getPointionProps(objectPoint: any): PoitionConfig {
    const type =
      (objectPoint.properties?.find(
        (prop: { name: string; value: string | number }) => prop.name === 'type',
      )?.value as PoitionType) || 'hp';
    const size =
      (objectPoint.properties?.find(
        (prop: { name: string; value: string | number }) => prop.name === 'size',
      )?.value as PoitionSize) || 'small';
    return {
      type,
      size,
    };
  }
  private setFrameBasedOnConfig(): void {
    const { size, type } = this.config;
    let frame: number;
    if (type === 'hp') {
      frame = size === 'big' ? 466 : 498;
    } else if (type === 'stamina') {
      frame = size === 'big' ? 468 : 500;
    } else {
      frame = size === 'big' ? 466 : 498;
    }
    this.setFrame(frame);
  }
}
