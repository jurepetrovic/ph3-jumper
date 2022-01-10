import { Game, Types } from 'phaser';
import { LoadingScene } from './scenes/loading';


// override window interface
declare global {
    interface Window {
        //sizeChanged: () => void;
        game: Phaser.Game;
    }
}

const gameConfig: Types.Core.GameConfig = {
title: 'Phaser Demo Jumper',
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#351f1b',
  scale: {
    mode: Phaser.Scale.FIT,
    width: 800, //window.innerWidth,
    height: 600, //window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {y: 800},
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
        // resize after loaded
        //window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene],
};

// declare global resizing function
/*
window.sizeChanged = () => {
    if (window.game.isBooted) {
      setTimeout(() => {
        console.log(`resize width=${window.innerWidth}, height=${window.innerHeight}`);
        window.game.scale.resize(window.innerWidth, window.innerHeight);
        window.game.canvas.setAttribute(
          'style',
          `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
        );
      }, 100);
    }
  };
window.onresize = () => window.sizeChanged();
*/

// create game
window.game = new Game(gameConfig);