import { Platform } from './Platform';
import { GameObject } from '../engine/GameObject';
import { Pipe } from './Pipe';
import { Sprite } from 'pixi.js';

export class PipeManager extends GameObject {
  private _platform: Platform | undefined;
  private _minInterval: number = 102;
  private _maxInterval: number = 465;
  private _currentInterval: number = 465; // Time in milliseconds between pipe spawns
  private _lastPipeTime: number = 0;
  private _invertedPipe: boolean = false;
  private _pipes: Pipe[] = [];

  protected defineSprite(): Sprite {
    return new Sprite();
  }
  
  public start(): void {
    this._lastPipeTime = performance.now();
    this._platform = this.currentScene?.findGameObjectByType(Platform)[0];
  }

  public update(deltaTime: number): void {
    const currentTime = performance.now();
    if (currentTime - this._lastPipeTime > this._currentInterval) {
      this._lastPipeTime = currentTime;
      this._createPipe();
    }

    // Move and remove pipes
    this._pipes.forEach(pipe => {
      pipe.fixed_update(deltaTime);

      if (pipe.sprite.x + pipe.sprite.width < 0) {
        pipe.destroy();
        this._pipes = this._pipes.filter(p => p !== pipe);
      }
    });
  }

  private _createPipe(): void {
    
    this._invertedPipe = !this._invertedPipe;
    
    const pipe = new Pipe();
    pipe.start();
    
    const pipeHeight = pipe.texture?.height;

    const screenWidth = this._renderer.width;
    const screenHeight = this._renderer.height;

    const roofHeight = this._platform?.roofHeight || 0;

    if (this._invertedPipe) {
      pipe.sprite.scale.y = -1;
    }

    const yVariation = Math.random() * ((pipeHeight - roofHeight) - roofHeight) + roofHeight;

    pipe.sprite.x = screenWidth;
    pipe.sprite.y = this._invertedPipe ? pipeHeight - yVariation : (screenHeight - pipeHeight) + yVariation;

    this._pipes.push(pipe);

    this._currentInterval = Math.random() * (this._maxInterval - this._minInterval) + this._maxInterval;
  }
}
