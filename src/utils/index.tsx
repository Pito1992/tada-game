import { WORD_TILE_TABLE, WORD_LIST, WORD_LIST_LENGTH} from 'src/constants';
import { nanoid } from 'nanoid';
import { VIRTUAL_KEYBOARD_TEMPLATE } from 'src/constants';
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


// export function isMatchingWord(word1: string, word2: string) {
//   return RegExp(`^${word2}$`, 'g').test(word1);
// }
