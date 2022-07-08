export {};

declare global {
  interface Window {
    sizeChanged: () => void;
    game: Phaser.Game;
  }
}