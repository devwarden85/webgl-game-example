import * as PIXI from 'pixi.js';

export class SpriteManager {
  private static _instance: SpriteManager;

  public static getInstance(): SpriteManager {
    if (!SpriteManager._instance) {
      SpriteManager._instance = new SpriteManager();
    }
    return SpriteManager._instance;
  }

  loadTexture(path: string): PIXI.Texture {
    return PIXI.Texture.from(path);
  }

  public createSprite(param: string | PIXI.Texture): PIXI.Sprite {
    if (typeof param === 'string') {
      return new PIXI.Sprite(this.loadTexture(param));
    } else {
      return new PIXI.Sprite(param);
    }
  }

  public createTilingSprite(param: string | PIXI.Texture, width: number, height: number): PIXI.TilingSprite {
    if (typeof param === 'string') {
      return new PIXI.TilingSprite(this.loadTexture(param), width, height);
    } else {
      return new PIXI.TilingSprite(param, width, height);
    }
  }
}
