import { Actions } from './actions';
import { reducer, State } from './reducer';

export class Store {
  private state!: State;
  private listeners: Function[] = [];
  private static instance: Store;
  constructor(private rootReducer: typeof reducer) {
    if (Store.instance) {
      return Store.instance;
    }
    Store.instance = this;
    return this;
  }

  getState() {
    return this.state;
  }

  dispatch(action: Actions) {
    const oldState = {...this.state}
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state, oldState));
  }

  subscribe(listener: Function) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
