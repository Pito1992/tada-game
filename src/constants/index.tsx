import wordListJSON from 'src/fixtures/words.json';

export const WORD_LIST = wordListJSON;
export const WORD_LIST_LENGTH = WORD_LIST.length;

export const WORD_LENGTH = 5;
export const TRYING_TIMES = 6;

export const WORD_TILE_TABLE = {
  ROW: WORD_LENGTH,
  COL: TRYING_TIMES
}

export enum WORD_TILE_STATE {
  ABSENT = 'absent',
  PRESENT = 'present',
  CORRECT = 'correct',
}

export enum SPECIAL_KEY {
  BTN_ENTER = 'btn-enter',
  BTN_CANCEL = 'btn-cancel',
}

export const VIRTUAL_KEYBOARD_TEMPLATE = {
  qwe: 'qwertyuiop',
  asd: 'asdfghjkl',
  zxc: [SPECIAL_KEY.BTN_ENTER, 'zxcvbnm', SPECIAL_KEY.BTN_CANCEL],
}