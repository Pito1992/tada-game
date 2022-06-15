import { WORD_TILE_STATE } from 'src/constants';

export type WordTileItem = {
  key: string,
  value: string,
  state?: WORD_TILE_STATE
}

export type WordTileGroup = {
  key: string,
  value: WordTileItem[]
}

export type WordTileTable = WordTileGroup[];

export type VirtualKeyboardKeys = Record<string, string[]>;