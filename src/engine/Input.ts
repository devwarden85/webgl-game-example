export enum KeyCode {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Space = 'Space',
  Enter = 'Enter',
  Escape = 'Escape',
  KeyW = 'KeyW',
  KeyA = 'KeyA',
  KeyS = 'KeyS',
  KeyD = 'KeyD',
  KeyP = 'KeyP',
  // Add more as needed
}

export class Input {
  private static _instance: Input;
  private _currentKeys: { [key: string]: boolean } = {};
  private _previousKeys: { [key: string]: boolean } = {};
  private _currentMouseButtons: { [button: number]: boolean } = {};
  private _previousMouseButtons: { [button: number]: boolean } = {};

  private constructor() {
    window.addEventListener('keydown', (e) => this._currentKeys[e.code] = true);
    window.addEventListener('keyup', (e) => this._currentKeys[e.code] = false);
    window.addEventListener('mousedown', (e) => this._currentMouseButtons[e.button] = true);
    window.addEventListener('mouseup', (e) => this._currentMouseButtons[e.button] = false);
  }

  public static getInstance(): Input {
    if (!Input._instance) {
      Input._instance = new Input();
    }
    return Input._instance;
  }

  public update(): void {
    this._previousKeys = { ...this._currentKeys };
    this._previousMouseButtons = { ...this._currentMouseButtons };
  }

  public isKeyDown(key: string): boolean {
    return !!this._currentKeys[key];
  }

  public isKeyPressed(key: string): boolean {
    return !!this._currentKeys[key] && !this._previousKeys[key];
  }

  public isKeyReleased(key: string): boolean {
    return !this._currentKeys[key] && !!this._previousKeys[key];
  }

  public isMouseButtonDown(button: number): boolean {
    return !!this._currentMouseButtons[button];
  }

  public isMouseButtonPressed(button: number): boolean {
    return !!this._currentMouseButtons[button] && !this._previousMouseButtons[button];
  }

  public isMouseButtonReleased(button: number): boolean {
    return !this._currentMouseButtons[button] && !!this._previousMouseButtons[button];
  }
}
