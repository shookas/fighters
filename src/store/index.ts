import { Store } from './createStore';
import { reducer } from './reducer';

export const createStore = () => new Store(reducer);
