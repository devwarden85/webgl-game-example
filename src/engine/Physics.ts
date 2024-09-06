import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { GameObject } from './GameObject';
import { Renderer } from './Renderer';

export class Physics {
  private static _instance: Physics | null = null;
  private _engine: Matter.Engine;
  private _world: Matter.World;
  private _renderer: Renderer = Renderer.getInstance();
  private _debugGraphics: PIXI.Graphics;
  private _subscribers: Set<GameObject> = new Set();

  private constructor() {
    this._engine = Matter.Engine.create();
    this._world = this._engine.world;
    this._debugGraphics = new PIXI.Graphics();
    this._debugGraphics.zIndex = 9;
    this._engine.gravity.y = 0;
    this.setupCollisionDetection();
  }

  public static getInstance(): Physics {
    if (!Physics._instance) {
      Physics._instance = new Physics();
    }
    return Physics._instance;
  }

  public addBody(gameObject: GameObject): void {
    if (gameObject.body) {
      Matter.World.add(this._world, gameObject.body);
      this._subscribers.add(gameObject);
    }
  }

  public removeBody(gameObject: GameObject): void {
    if (gameObject.body) {
      Matter.World.remove(this._world, gameObject.body);
      this._subscribers.delete(gameObject);
    }
  }

  public update(): void {
    Matter.Engine.update(this._engine);
    this.drawDebug();
  }

  private setupCollisionDetection(): void {
    Matter.Events.on(this._engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        const gameObjectA = this.findGameObjectByBody(pair.bodyA);
        const gameObjectB = this.findGameObjectByBody(pair.bodyB);
        if (gameObjectA && gameObjectB) {
          gameObjectA.collision(gameObjectB);
          gameObjectB.collision(gameObjectA);
        }
      });
    });
  }

  private findGameObjectByBody(body: Matter.Body): GameObject | null {
    for (const gameObject of this._subscribers) {
      if (gameObject.body === body) {
        return gameObject;
      }
    }
    return null;
  }

  public drawDebug(): void {
    this._renderer.stage.addChild(this._debugGraphics)
    this._debugGraphics.clear();
    this._debugGraphics.lineStyle(2, 0xff0000);
    this._subscribers.forEach((gameObject) => {
      if (gameObject.body) {
        const vertices = gameObject.body.vertices;
        this._debugGraphics.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
          this._debugGraphics.lineTo(vertices[i].x, vertices[i].y);
        }
        this._debugGraphics.lineTo(vertices[0].x, vertices[0].y); 
      }      
    });
  }
}
