import * as PIXI from 'pixi.js';

export class Renderer {
  private static _instance: Renderer;
  private _app: PIXI.Application;

  constructor() {
    this._app = new PIXI.Application({
      resizeTo: window, // Resize the canvas to fit the window
      backgroundColor: 0x1099bb,
      preserveDrawingBuffer: true,
    });
    document.body.appendChild(this._app.view as HTMLCanvasElement);

    // Set the canvas to fill the viewport
    window.addEventListener('resize', this._onResize.bind(this));
    this._onResize();
  }

  public static getInstance(): Renderer {
    if (!Renderer._instance) {
      Renderer._instance = new Renderer();
    }
    return Renderer._instance;
  }

  public get app(): PIXI.Application {
    return this._app;
  }

  public get stage(): PIXI.Container {
    return this._app.stage;
  }

  public get width(): number {
    return this._app.view.width;
  }

  public get height(): number {
    return this._app.view.height;
  }

  public render(): void {
    this._app.render();
  }

  private _onResize(): void {
    this._app.renderer.resize(window.innerWidth - 4, 420);
  }
}
