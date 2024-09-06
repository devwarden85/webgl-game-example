import { GameLoop } from './engine/GameLoop';
import { MainScene } from './game/MainScene';

const mainScene = new MainScene();

GameLoop.getInstance().startScene(mainScene);
