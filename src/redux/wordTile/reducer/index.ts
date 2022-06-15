import { createReducer, current } from '@reduxjs/toolkit'
import {
  createNewGame,
  updateCharToWordTileRow,
  moveToNextWordTileRow,
  verifyWordTileRow,
} from 'src/redux/wordTile/actions';
import {
  WORD_LIST, WORD_TILE_TABLE, WORD_TILE_STATE,
  ERROR_NOT_ENOUGH_LETTERS,
  ERROR_NOT_IN_WORD_LIST,
  WORD_TILE_STATE_EMOJI,
} from 'src/constants';
import { getWordTileState } from 'src/utils';
import type { IWordTileState } from './interfaces';

export const initialState: IWordTileState = {
  loading: false,
  error: undefined,
  data: [],
  accumulator: {},
  metadata: {
    hiddenWord: '',
    createdAt: '',
    tempWord: '',
    attempt: 0,
    isGuessWordSuccessfully: false,
    isDisabled: false,
  }
};

const wordTileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createNewGame, (state, action) => ({
      ...state,
      error: undefined,
      loading: false,
      ...action.payload,
    }))
    .addCase(updateCharToWordTileRow, (state, action) => {
      const { data } = current(state);
      const { tempWord, attempt } = action.payload.metadata

      const newData = [];
      for (let i = 0; i < WORD_TILE_TABLE.ROW; i++) {
        if (i === attempt) {
          newData.push({
            key: data[i].key,
            value: data[i].value.map(({ key }, index) => ({
              key,
              value: tempWord[index] || '',
              ...(tempWord[index] && { state: WORD_TILE_STATE.TBD })
            }))
          })
        } else {
          newData.push(data[i]);
        }
      }
      
      return {
        ...state,
        error: undefined,
        loading: false,
        data: newData,
        metadata: {
          ...state.metadata,
          tempWord,
          attempt
        }
      };
    })
    .addCase(verifyWordTileRow, (state) => {
      const {
        data, 
        metadata: { tempWord = '', attempt = 0, hiddenWord = '' },
        accumulator,
      } = current(state);
      
      const newData = [];
      if (attempt < WORD_TILE_TABLE.COL) {
        if (tempWord?.length < WORD_TILE_TABLE.ROW) {
          return {
            ...state,
            error: ERROR_NOT_ENOUGH_LETTERS,
            loading: false,
          }
        }

        if (tempWord?.length === WORD_TILE_TABLE.ROW) {
          if (!WORD_LIST.includes(tempWord)) {
            return {
              ...state,
              error: ERROR_NOT_IN_WORD_LIST,
              loading: false,
            }
          }

          for (let i = 0; i < WORD_TILE_TABLE.ROW; i++) {
            if (i === attempt) {
              newData.push({
                key: data[i].key,
                value: data[i].value.map(({ key, value }, index) => ({
                  key,
                  value,
                  state: getWordTileState(value, hiddenWord, index),
                })),
              });
            } else {
              newData.push(data[i]);
            }
          }

          const isGuessWordSuccessfully = tempWord === hiddenWord;
    
          return {
            ...state,
            loading: false,
            data: newData,
            accumulator: {
              ...accumulator,
              ...(newData[attempt].value.reduce((acc, { value, state }) => ({
                ...acc,
                [value]: state,
              }), {})),
            },
            metadata: {
              ...state.metadata,
              tempWord: '',
              attempt: attempt + 1 ,
              isGuessWordSuccessfully,
              isDisabled: isGuessWordSuccessfully
            }
          }
        }
      }

      return {
        ...state,
        metadata: {
          ...state.metadata,
          isDisabled: true,
        }
      };
    })
      
});

export default wordTileReducer;
