import Matter from 'matter-js';
import { Platform } from './Platform';
import { Input } from '../engine';
import { GameObject } from '../engine/GameObject';
import { Pipe } from './Pipe';
import { Sprite } from 'pixi.js';

export class Bird extends GameObject {
  private _gravity: number = 0.5;
  private _velocity: number = 0;
  private _jumpStrength: number = -10;
  private _input: Input = Input.getInstance();
  private _platform: Platform | undefined;

  protected defineSprite(): Sprite {
    this._sprite = this._spriteManager.createSprite('assets/images/bird.png');
    this._sprite.x = this._sprite.x + (this._renderer.width / 6);
    this._renderer.stage.addChild(this._sprite);
    return this.sprite;
  }

  public initPhysics(): void {
    this._body = Matter.Bodies.circle(
      this._sprite.position.x, 
      this._sprite.position.y, 
      12, 
      {
        isSensor: true,
      }
    );
  }

  public start(): void {
    this._platform = this.currentScene?.findGameObjectByType(Platform)[0];
  }

  public update(deltaTime: number): void {
    this._velocity += this._gravity;
    this._sprite.y += this._velocity;

    // Prevent bird from passing through the floor
    const floorY = this._platform?.floorY || 0;
    if (this._sprite.y > floorY - this._sprite.height) {
      this._sprite.y = floorY - this._sprite.height;
      this._velocity = 0;
    }

    // Prevent bird from passing through the roof
    const roofHeight = this._platform?.roofHeight || 0;
    if (this._sprite.y < roofHeight) {
      this._sprite.y = roofHeight;
      this._velocity = 0;
    }

    if (this._input.isMouseButtonPressed(0)) {
      this._jump();
    }
  }

  public collision(other: GameObject): void {
    if (other instanceof Pipe) {
      console.log('Bird collided with a Pipe!');
      // Handle bird-pipe collision logic here
    }
  }

  private _jump(): void {
    this._velocity = this._jumpStrength;
  }
}
