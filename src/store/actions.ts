import { PoitionConfig } from 'src/game/poition/Poition';

export enum ActionType {
  UpdateStamina = 'UpdateStamina',
  UpdateHp = 'UpdateHp',
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

type UpdateStamina = { type: ActionType.UpdateStamina; payload: number };
export const updateStamina = (value: number): UpdateStamina => ({
  type: ActionType.UpdateStamina,
  payload: value,
});

type UpdateHp = { type: ActionType.UpdateHp; payload: number };
export const updateHp = (value: number): UpdateHp => ({
  type: ActionType.UpdateHp,
  payload: value,
});

export type Actions = GainPoition | LoosePoition | GainGold | LooseGold | UpdateStamina | UpdateHp;
