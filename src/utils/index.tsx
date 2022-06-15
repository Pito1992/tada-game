import { nanoid } from 'nanoid';
import { VIRTUAL_KEYBOARD_TEMPLATE, WORD_TILE_TABLE, WORD_LIST, WORD_LIST_LENGTH, WORD_TILE_STATE, WORD_TILE_STATE_EMOJI } from 'src/constants';
import type { WordTileTable, VirtualKeyboardKeys } from './types';

export function getSizeOfWordTileTable(): WordTileTable {
  return [...Array(WORD_TILE_TABLE.COL)].map(() => ({
    key: nanoid(4),
    value: [...Array(WORD_TILE_TABLE.ROW)].map(() => ({ key: nanoid(8), value: '' })),
  }))
}

export function getRandomNumber(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

export function getRandomWord(): string {
  const index = getRandomNumber(0, WORD_LIST_LENGTH);
  return WORD_LIST[index]
}

export function formatTimer(value: number): string {
  const result = `0${value}`;
  if (result.length > 2) {
    return result.substring(1);
  }
  return result;
}

export function getVirtualKeyboardKeys(): VirtualKeyboardKeys {
  function splitKeys(value: string | string[]): string[] {
    if (!Array.isArray(value)) {
      return value.split('');
    }
    return value.reduce((acc: string[], item: string): string[] => {
      if (/^btn-/gi.test(item)) {
        acc.push(item);
        return acc;
      }

      return [...acc, ...splitKeys(item)];
    }, []);
  }
  
  return Object.entries(VIRTUAL_KEYBOARD_TEMPLATE).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: splitKeys(value),
  }), {});
}

export function getWordTileState(
  char: string,
  stringToVerify: string,
  index: number,
) {
  if (char === stringToVerify[index]) {
    return WORD_TILE_STATE.CORRECT;
  } else if (RegExp(`${char}`).test(stringToVerify)) {
    return WORD_TILE_STATE.PRESENT;
  } else {
    return WORD_TILE_STATE.ABSENT;
  }
}

export function getCurrentTime() {
  const date = new Date(Date.now());
	const month = `0${date.getMonth() + 1}`.substring(0, 2);
  const year = date.getFullYear();
	const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getWordTileStateByAttempt(data: WordTileTable, attempt: number): string[] {
  const result = [...Array(attempt)].fill('');
  for (let i = 0; i < attempt; i++) {
    data[i].value.forEach(({ state }) => {
      if (state) {
        result[i] += WORD_TILE_STATE_EMOJI[state];
      };
    });
  }

  return result;
}