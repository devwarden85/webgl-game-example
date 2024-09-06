import { Input, KeyCode } from "./Input";
import { Renderer } from "./Renderer";
import { GameScene } from "./GameScene";
import { Physics } from "./Physics";

export class GameLoop {
  private static _instance: GameLoop | null;
  private _currentScene: GameScene | undefined;
  private _input: Input = Input.getInstance();
  private _renderer: Renderer = Renderer.getInstance();
  private _physics: Physics = Physics.getInstance();

  private _paused: boolean;

  constructor() {
    this._paused = false;
  }

  public static getInstance(): GameLoop {
    if (!GameLoop._instance) {
      GameLoop._instance = new GameLoop();
    }
    return GameLoop._instance;
  }

  public get currentScene(): GameScene | undefined {
    return this._currentScene;
  }

  public get isPaused(): boolean {
    return this._paused
  }

  public startScene(gameScene: GameScene) {
    this._currentScene = gameScene;
    this.start();
  }

  public togglePause(): void {
    this._paused = !this._paused;
  }

  private start(): void {
    this._renderer.app.ticker.add(this.loop.bind(this));
    this._currentScene?.start();
  }

  private loop(delta: number): void {

    if (this._input.isKeyPressed(KeyCode.KeyP)) {
      this.togglePause();
    }

    if (this._paused) {
      this._input.update();
      return;
    }

    this._currentScene?.update(delta);
    this._renderer.render();
    this._physics.update();
    this._input.update();
  }
}
