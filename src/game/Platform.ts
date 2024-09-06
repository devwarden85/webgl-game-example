import { Sprite } from 'pixi.js';
import { GameObject } from '../engine/GameObject';
import * as PIXI from 'pixi.js';

export class Platform extends GameObject {
  private static readonly TEXTURE_PATH = 'assets/images/base.png';
  private _floorSprite: PIXI.TilingSprite | undefined;
  private _roofSprite: PIXI.TilingSprite | undefined;

  protected defineSprite(): Sprite {
    return new Sprite();
  }

  public start(): void {
    const texture = this._spriteManager.loadTexture(Platform.TEXTURE_PATH);

    const baseWidth = this._renderer.width;
    const baseHeight = 50;

    // Floor
    this._floorSprite = this._spriteManager.createTilingSprite(texture, baseWidth, baseHeight);
    this._floorSprite.y = this._renderer.stage.height - baseHeight;
    this._floorSprite.width = baseWidth;
    this._floorSprite.height = baseHeight;
    
    // Roof
    this._roofSprite = this._spriteManager.createTilingSprite(texture, baseWidth, baseHeight);
    this._roofSprite.y = baseHeight;
    this._roofSprite.scale.y = -1; // Flip the texture vertically
    this._roofSprite.width = baseWidth;
    this._roofSprite.height = baseHeight;

    this._renderer.stage.addChild(this._floorSprite);
    this._renderer.stage.addChild(this._roofSprite);
  }

  public get floorY(): number | undefined  {
    return this._floorSprite?.y;
  }

  public get roofHeight(): number | undefined {
    return this._roofSprite?.height;
  }
}
