import { Sprite } from 'pixi.js';
import { GameObject } from '../engine/GameObject';

export class Background extends GameObject {
  
  protected defineSprite(): Sprite {
    this._sprite = this._spriteManager.createTilingSprite(
      'assets/images/background.png',
      this._renderer.width,
      this._renderer.height,
    );
    this._renderer.stage.addChild(this._sprite);
    return this._sprite;
  }
}
