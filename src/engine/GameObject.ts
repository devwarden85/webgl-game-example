import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
import { SpriteManager } from './SpriteManager';
import { Renderer } from './Renderer';
import { Physics } from './Physics';
import { GameLoop } from '.';
import { GameScene } from '../game';

export interface GameObjectOptions {
  sprite?: PIXI.Sprite;
  position?: { x: number; y: number };
  scale?: { x: number; y: number };
  rotation?: number;
  anchor?: { x: number; y: number };
}

export abstract class GameObject {
  protected _sprite: PIXI.Sprite;
  protected _body: Matter.Body | undefined = undefined;

  protected _gameLoop: GameLoop = GameLoop.getInstance();
  protected _renderer: Renderer = Renderer.getInstance();
  protected _spriteManager: SpriteManager = SpriteManager.getInstance();
  protected _physics: Physics = Physics.getInstance();

  constructor(options: GameObjectOptions = {}) {

    this._sprite = this.defineSprite();

    if(this.sprite){
      if (options.position) {
        this.sprite.position.set(options.position.x, options.position.y);
      }

      if (options.scale) {
        this.sprite.scale.set(options.scale.x, options.scale.y);
      }

      if (options.rotation !== undefined) {
        this.sprite.rotation = options.rotation;
      }

      if (options.anchor) {
        this.sprite.anchor.set(options.anchor.x, options.anchor.y);
      }

      this._renderer.stage.addChild(this.sprite);

      this.initPhysics();
      this._physics.addBody(this);
    }
  }

  protected abstract defineSprite(): PIXI.Sprite;

  public initPhysics(): void {}

  public start(): void {}

  public fixed_update(deltaTime: number): void {
    this.update(deltaTime);
    if (this._body && this._sprite) {
      const upsidedown = this._sprite.scale.y < 0;
      Matter.Body.setPosition(this._body, { 
        x: this._sprite.x + this._sprite.width / 2, 
        y: upsidedown ? this._sprite.y - this._sprite.height / 2 : this._sprite.y + this._sprite.height / 2
      });
      Matter.Body.setAngle(this._body, this._sprite.rotation);
    }
  }

  public update(deltaTime: number): void {}

  public collision(other: GameObject): void {}

  public destroy(): void {
    this._renderer.stage.removeChild(this._sprite);
    this._physics.removeBody(this);
  }

  public get currentScene(): GameScene | undefined {
    return this._gameLoop.currentScene;
  }

  public get texture(): PIXI.Texture {
      return this._sprite.texture;
  }

  public get sprite(): PIXI.Sprite {
      return this._sprite;
  }

  public get body(): Matter.Body | undefined {
      return this._body;
  }
}
