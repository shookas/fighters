export class Dispatcher {
  constructor(private gameCanvas: HTMLCanvasElement) {}

  dispach<T>(eventName: string, detail: T) {
    const event = new CustomEvent(eventName, {detail, bubbles: true});
    this.gameCanvas.dispatchEvent(event);
  }
}
