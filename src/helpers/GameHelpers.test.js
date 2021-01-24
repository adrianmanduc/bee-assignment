import { CHAR_TYPES } from '@constants/config';
import { checkIfWasp, checkIfQueen, checkIfBee } from '@helpers/GameHelpers';

it('should validate checkIfWasp', () => {
  expect(checkIfWasp(null)).toBeFalsy();
  const c = { type: CHAR_TYPES.QUEEN_WASP };
  expect(checkIfWasp(c)).toBeTruthy();
  c.type = CHAR_TYPES.QUEEN_BEE;
  expect(checkIfWasp(c)).toBeFalsy();
});

it('should validate checkIfBee', () => {
  expect(checkIfBee(null)).toBeFalsy();
  const c = { type: CHAR_TYPES.QUEEN_BEE };
  expect(checkIfBee(c)).toBeTruthy();
  c.type = CHAR_TYPES.GUARDIAN_WASP;
  expect(checkIfBee(c)).toBeFalsy();
});

it('should validate checkIfQueen', () => {
  expect(checkIfQueen(null)).toBeFalsy();
  const c = { type: CHAR_TYPES.QUEEN_WASP };
  expect(checkIfQueen(c)).toBeTruthy();
  c.type = CHAR_TYPES.GUARDIAN_BEE;
  expect(checkIfQueen(c)).toBeFalsy();
});
