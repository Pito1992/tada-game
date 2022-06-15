import { IWordTilePayload } from 'src/redux/wordTile/actions/interfaces';
import type { WordTileItem } from 'src/utils/types';

export interface IWordTileState extends IWordTilePayload {
  loading: boolean,
  error: unknown,
  accumulator: Record<string, WordTileItem>
}
