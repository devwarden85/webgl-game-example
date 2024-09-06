export interface LevelSettings {
  currentSpeed: number;
}

export class GameState {
  private static _instance: GameState | null;

  public settings: LevelSettings = {
    currentSpeed: 5.2,
  } as LevelSettings;

  public static getInstance(): GameState {
    if (!GameState._instance) {
      GameState._instance = new GameState();
    }
    return GameState._instance;
  }
}