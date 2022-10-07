import { PoitionConfig } from 'src/game/poition/Poition';

export enum ActionType {
  GainHp = 'GainHp',
  LooseHp = 'LooseHp',
  GainGold = 'GainGold',
  LooseGold = 'LooseGold',
  GainPoition = 'GainPoition',
  LoosePoition = 'LoosePoition',
}

type GainPoition = { type: ActionType.GainPoition; payload: PoitionConfig };
export const gainPoition = (poition: PoitionConfig): GainPoition => ({
  type: ActionType.GainPoition,
  payload: poition,
});

type LoosePoition = { type: ActionType.LoosePoition; payload: PoitionConfig };
export const loosePoition = (poition: PoitionConfig): LoosePoition => ({
  type: ActionType.LoosePoition,
  payload: poition,
});

type GainGold = { type: ActionType.GainGold; payload: number };
export const gainGold = (value: number): GainGold => ({
  type: ActionType.GainGold,
  payload: value,
});

type LooseGold = { type: ActionType.LooseGold; payload: number };
export const looseGold = (value: number): LooseGold => ({
  type: ActionType.LooseGold,
  payload: value,
});

export type Actions = GainPoition | LoosePoition | GainGold | LooseGold;
