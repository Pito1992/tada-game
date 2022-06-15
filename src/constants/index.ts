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
  TBD = 'tbd',
  ABSENT = 'absent',
  PRESENT = 'present',
  CORRECT = 'correct',
}

export const WORD_TILE_STATE_EMOJI = {
  [WORD_TILE_STATE.TBD]: '⬛',
  [WORD_TILE_STATE.ABSENT]: '⬛',
  [WORD_TILE_STATE.PRESENT]: '🟨',
  [WORD_TILE_STATE.CORRECT]: '🟩',
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

export const ERROR_NOT_ENOUGH_LETTERS = 'Not enough letters';
export const ERROR_NOT_IN_WORD_LIST = 'Not in word list';
export const LIST_OF_NOTIFY_WINNER = ['Magnificent', 'Awesome', 'You rock', 'Phew'];