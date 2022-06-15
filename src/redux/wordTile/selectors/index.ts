import { createSelector } from '@reduxjs/toolkit';
import type { IWordTileState } from 'src/redux/wordTile/reducer/interfaces';
import type { WordTileMetadata } from 'src/redux/wordTile/actions/interfaces';
import type { WordTileItem, WordTileTable } from 'src/utils/types';
import type { RootState } from 'src/redux/interfaces';

export const wordTileSelector = (state: RootState): IWordTileState => state.wordTile;

export const wordTileDataSelector = createSelector(
  wordTileSelector,
  ({ data }: IWordTileState): WordTileTable => data,
);

export const wordTileMetadataSelector = createSelector(
  wordTileSelector,
  ({ metadata }: IWordTileState): WordTileMetadata => metadata,
);

export const wordTileAccumulatorSelector = createSelector(
  wordTileSelector,
  ({ accumulator }: IWordTileState): Record<string, WordTileItem> => accumulator,
);

export const wordTileErrorSelector = createSelector(
  wordTileSelector,
  ({ error }: IWordTileState): unknown => error,
);

