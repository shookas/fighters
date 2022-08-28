export interface WeaponConfig {
  range: number;
  duration: number;
  damage: number;
}
export const mapWeapon = new Map<number, WeaponConfig>().set(50, {
  range: 12,
  duration: 500,
  damage: 1,
});
