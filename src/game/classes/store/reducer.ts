import { PoitionConfig } from 'src/game/poition/Poition';
import { Actions } from './actions';

export interface State {
  hpPoitions: PoitionConfig[];
  staminaPoitions: PoitionConfig[];
  gold: number;
}
const initialState: State = {
  hpPoitions: [],
  staminaPoitions: [],
  gold: 0,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case 'GainPoition':
      if (action.payload.type === 'hp') {
        return {
          ...state,
          hpPoitions: [...state.hpPoitions, action.payload],
        };
      } else {
        return {
          ...state,
          staminaPoitions: [...state.staminaPoitions, action.payload],
        };
      }
    case 'LoosePoition':
      if (action.payload.type === 'hp') {
        return {
          ...state,
          hpPoitions: [...state.hpPoitions.slice(0, 1)],
        };
      } else {
        return {
          ...state,
          staminaPoitions: [...state.staminaPoitions.slice(0, 1)],
        };
      }
    case 'GainGold':
      return {
        ...state,
        gold: state.gold + action.payload,
      };
    case 'LooseGold':
      return {
        ...state,
        gold: state.gold - action.payload,
      };
    default:
      return state;
  }
};
