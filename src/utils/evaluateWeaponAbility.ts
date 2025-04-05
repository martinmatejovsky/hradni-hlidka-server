import {WeaponAbility, WeaponType} from '../constants/customTypes';

export const evaluateWeaponAbility = (weapon: WeaponType): WeaponAbility => ({
  perkSharpSword: weapon === WeaponType.SWORD,
  perkBoilingOil: weapon === WeaponType.SWORD || weapon === WeaponType.CANNON || weapon === WeaponType.NONE,
  canDefeatInvaders: weapon === WeaponType.SWORD || weapon === WeaponType.NONE,
  canBombardAssemblyArea: weapon === WeaponType.CANNON,
});