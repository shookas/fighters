export enum ScoreOperations {
  INCREASE,
  DECREASE,
  SET_VALUE,
}
export class Score {
  private scoreValue = 0;
  private static _instance: Score;
  constructor() {
    if (Score._instance) {
      return Score._instance;
    }
    Score._instance = this;
  }
  
  public changeValue(operation: ScoreOperations, value: number): void {
    switch (operation) {
      case ScoreOperations.INCREASE:
        this.scoreValue += value;
        break;
      case ScoreOperations.DECREASE:
        this.scoreValue -= value;
        break;
      case ScoreOperations.SET_VALUE:
        this.scoreValue = value;
        break;
      default:
        break;
    }
  }
  public getValue(): number {
    return this.scoreValue;
  }
}
