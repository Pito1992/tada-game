import { createAction } from '@reduxjs/toolkit';
import {
  CREATE_NEW_GAME,
  UPDATE_CHAR_TO_WORD_TILE_ROW,
  MOVE_TO_NEXT_ROW,
  VERIFY_WORD_TILE_ROW
} from 'src/constants/actionTypes';
import { getSizeOfWordTileTable, getRandomWord } from 'src/utils';
// import { IWordTileInfo, IWordTileActionType } from './interfaces';
// import type { WordTileItem, WordTileGroup, WordTileTable } from  'src/utils/types';

export const createNewGame = createAction(CREATE_NEW_GAME, () => ({
  payload: {
    data: getSizeOfWordTileTable(),
    metadata: {
      hiddenWord: getRandomWord(),
      createdAt: new Date().toISOString(),
    }
  }
}))

export const updateCharToWordTileRow = createAction(UPDATE_CHAR_TO_WORD_TILE_ROW, (tempWord: string, attempt: number) => ({
  payload: {
    metadata: {
      tempWord: tempWord.toLowerCase(),
      attempt,
    }
  }
}));

export const verifyWordTileRow = createAction(VERIFY_WORD_TILE_ROW);

export const moveToNextWordTileRow = createAction(MOVE_TO_NEXT_ROW);
