import {WeaponAbility, WeaponType} from '../constants/customTypes';

export const evaluateWeaponAbility = (weapon: WeaponType): WeaponAbility => ({
  perkSharpSword: weapon === WeaponType.SWORD,
  perkBoilingOil: weapon === WeaponType.SWORD,
  canDefeatInvaders: weapon === WeaponType.SWORD || weapon === WeaponType.AXE || weapon === WeaponType.SPEAR,
  canBombardAssemblyArea: weapon === WeaponType.CANNON,
});