import type { WordTileTable } from 'src/utils/types';

export type WordTileMetadata = {
  hiddenWord?: string,
  createdAt?: string,
  tempWord?: string,
  attempt?: number,
  isGuessWordSuccessfully?: boolean,
  isDisabled?: boolean,
}

export interface IWordTilePayload {
  data: WordTileTable,
  metadata: WordTileMetadata
}

export interface IWordTileActionType {
  type: string
  payload?: IWordTilePayload,
  error?: unknown
}
