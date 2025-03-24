import {WeaponAbility, WeaponType} from '../constants/customTypes';

export const evaluateWeaponAbility = (weapon: WeaponType): WeaponAbility => ({
  perkSharpSword: weapon === WeaponType.SWORD,
  perkBoilingOil: weapon === WeaponType.SWORD || weapon === WeaponType.CANON,
  canDefeatInvaders: weapon === WeaponType.SWORD,
  canBombardAssemblyArea: weapon === WeaponType.CANON,
});