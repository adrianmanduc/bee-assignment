import { ReactComponent as WASP_ICON } from '@assets/images/characters/wasp.svg';
import { ReactComponent as BEE_ICON } from '@assets/images/characters/bee.svg';

const queenBaseProps = { HP: 100, DF: 50, AK: 50, LUCK: { min: 0, max: 5 } };
const guardianBaseProps = { HP: 100, DF: 30, AK: 30, LUCK: { min: 0, max: 5 } };

const ICON_SIZES = {
  QUEEN: 46,
  GUARDIAN: 28
};

export const GAME_CONFIG = {
  BOARD_SIZE: 5,
  CHARACTERS: {
    QUEEN_WASP: { ...queenBaseProps, img: { component: WASP_ICON, size: ICON_SIZES.QUEEN } },
    GUARDIAN_WASP: { ...guardianBaseProps, img: { component: WASP_ICON, size: ICON_SIZES.GUARDIAN } },
    QUEEN_BEE: { ...queenBaseProps, img: { component: BEE_ICON, size: ICON_SIZES.QUEEN } },
    GUARDIAN_BEE: { ...guardianBaseProps, img: { component: BEE_ICON, size: ICON_SIZES.GUARDIAN } }
  }
};

export const CHAR_TYPES = {
  QUEEN_WASP: 'QUEEN_WASP',
  QUEEN_BEE: 'QUEEN_BEE',
  GUARDIAN_BEE: 'GUARDIAN_BEE',
  GUARDIAN_WASP: 'GUARDIAN_WASP'
};

export const LABELS = {
  QUEEN_WASP: 'Queen Wasp',
  GUARDIAN_WASP: 'Guardian Wasp',
  QUEEN_BEE: 'Queen Bee',
  GUARDIAN_BEE: 'Guardian Bee',
  HP: 'Health',
  DF: 'Defense',
  AK: 'Attack',
  LUCK: 'Luck'
};

export const LOG_TYPES = {
  MOVE: 'Move',
  ATTACK: 'Attack',
  DEATH: 'Death',
  INFO: 'Info'
};

export const PLAYERS = {
  HUMAN: 'HUMAN',
  COMPUTER: 'COMPUTER'
};
