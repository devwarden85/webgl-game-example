import Matter from 'matter-js';
import { GameObject } from '../engine/GameObject';
import { GameState } from './GameState';
import { Sprite } from 'pixi.js';

export class Pipe extends GameObject{
  private _gameState: GameState = GameState.getInstance();
  
  protected defineSprite(): Sprite {
    this._sprite = this._spriteManager.createSprite('assets/images/pipe.png')
    this._sprite.width = this.texture?.width || 0;
    this._sprite.height = this.texture?.height || 0;
    this._renderer.stage.addChild(this._sprite);
    return this._sprite;
  }

  public initPhysics(): void {
    this._body = Matter.Bodies.rectangle(
      this._sprite.position.x, 
      this._sprite.position.y, 
      this._sprite.width, 
      this._sprite.height, 
      {
        isSensor: true,
      }
    );
  }

  public update(deltaTime: number): void {
    this._sprite.x -= this._gameState.settings.currentSpeed; // Move speed
  }
}