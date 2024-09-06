import { GameScene } from ".";
import { Bird } from '../game/Bird';
import { Background } from '../game/Background';
import { Platform } from '../game/Platform';
import { PipeManager } from '../game/PipeManager';

export class MainScene extends GameScene {
  public mount(): void {
    this._gameObjects.push(
      new Background(),
      new Platform(),
      new Bird(),
      new PipeManager()
    );
  }
}