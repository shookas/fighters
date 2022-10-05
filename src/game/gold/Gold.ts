import { Physics } from 'phaser';
import { Player } from '../player/Player';
import { EVENTS_NAME, texturesSizes } from '../consts';

export class Gold extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y + 4, texturesSizes.xsmall, 2018);
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
      this.getLoot();
    });
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'rotate',
      frames: this.scene.anims.generateFrameNames('a-gold', {
        prefix: 'rotate-',
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
    !this.anims.isPlaying && this.play('rotate', true);
  }

  private getLoot() {
    this.scene.game.events.emit(EVENTS_NAME.chestLoot, 1);
    this.destroy();
  }
}
