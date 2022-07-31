import { Game, Types } from 'phaser';
import { Level2, LoadingScene, Test } from './scenes';
import { Level1 } from './scenes/level-1';
import { UIScene } from './scenes/ui';

type GameConfigExtended = Types.Core.GameConfig & {
    winScore: number;
  };

export const gameConfig: GameConfigExtended = {
    title: 'Phaser game tutorial',
    type: Phaser.WEBGL,
    parent: 'game',
    backgroundColor: '#351f1b',
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
                debug: false,
                debugShowBody: true,
                debugShowStaticBody: true,
                debugShowVelocity: true,
                debugVelocityColor: 0xffff00,
                debugBodyColor: 0x0000ff,
                debugStaticBodyColor: 0xffffff
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    callbacks: {
        postBoot: () => {
            window.sizeChanged();
        },
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: [LoadingScene, Test, Level1, Level2, UIScene],
    winScore: 40,
};

window.sizeChanged = () => {
    if (window.game.isBooted) {
        setTimeout(() => {
            window.game.scale.resize(window.innerWidth, window.innerHeight);
            window.game.canvas.setAttribute(
                'style',
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
            );
        }, 100);
    }
};
window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);