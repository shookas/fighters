import { Store } from './createStore';
import { reducer } from './reducer';

export const store = new Store(reducer);
