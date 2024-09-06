import { GameObject } from './GameObject';
import { GameLoop, Input } from '.';

export abstract class GameScene {
  protected _input: Input = Input.getInstance();
  protected _globalLoop: GameLoop = GameLoop.getInstance();
  protected _gameObjects: GameObject[];

  constructor() {
    this._gameObjects = [];    
  }

  protected abstract mount(): void;

  public start(): void {
    this.mount();
    setTimeout(() => this._gameObjects?.forEach(go => {
      go.start();
    }), 0)
  }

  public update(delta: number): void {
    this._gameObjects?.forEach(go => go.fixed_update(delta));
    if (this._input.isKeyPressed('P')) {
      this._globalLoop.togglePause();
    }
  }

  public findGameObjectByType<T extends GameObject>(type: { new (...args: any[]): T }): T[]  {
    return this._gameObjects.filter(go => go instanceof type) as T[] | [];
  }
}