import { Actions } from './actions';
import { reducer, State } from './reducer';

export class Store {
  private state!: State;
  private listeners: { listener: Function; scope?: keyof State }[] = [];
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
    const oldState = { ...this.state };
    this.state = this.rootReducer(this.state, action);
    const changes = this.changeDetector(oldState, this.state);
    this.listeners.forEach(({ listener, scope }) => {
      if (scope) {
        if (changes.includes(scope)) {
          listener(this.state, oldState);
        }
      } else {
        listener(this.state, oldState);
      }
    });
  }

  subscribe(listener: Function, scope?: keyof State) {
    this.listeners.push({ listener, scope });

    return () => {
      this.listeners = this.listeners.filter((l) => l.listener !== listener);
    };
  }

  private changeDetector(oldState: State, newState: State): Array<keyof State> {
    const changes: Array<keyof State> = [];
    Object.keys(newState).forEach((key) => {
      const stateKey = key as unknown as keyof State;
      const change =
        typeof oldState[stateKey] === 'object'
          ? JSON.stringify(oldState[stateKey]) !== JSON.stringify(newState[stateKey])
          : oldState[stateKey] !== newState[stateKey];
      if (change) {
        changes.push(stateKey);
      }
    });
    return changes;
  }
}
