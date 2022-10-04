import { Physics } from 'phaser';
import { Player } from '../player/Player';
import { CHESTS, EVENTS_NAME } from '../consts';

export class Chest extends Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private config: typeof CHESTS.full,
    player: Player,
  ) {
    super(scene, x, y + 8, 'tiles_spr', config.frame);
    this.scene = scene;
    this.initAnimations();
    this.addToScene();
    this.interactWithPlayer(player);
  }

  private addToScene() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  private interactWithPlayer(player: Player) {
    this.scene.physics.add.overlap(player, this, () => {
      !this.anims.isPlaying && this.play('open', true);
    });
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'open',
      frames: this.scene.anims.generateFrameNames(this.config.openAnimationKey, {
        prefix: 'open-',
        end: 3,
      }),
      frameRate: 6,
    });
    this.on('animationcomplete', this.getLoot.bind(this));
  }

  private getLoot() {
    this.scene.game.events.emit(EVENTS_NAME.chestLoot, 10);
    this.destroy();
  }
}
