export type WordTileItem = {
  key: string,
  value: string
}

export type WordTileGroup = {
  key: string,
  value: Array<WordTileItem>
}

export type WordTileTable = WordTileGroup[];

export type VirtualKeyboardKeys = Record<string, string[]>;