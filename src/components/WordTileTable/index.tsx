import React from 'react';
import classNames from 'classnames';
import WordTile from 'src/components/WordTile';

import { WORD_TILE_TABLE, WORD_TILE_STATE } from 'src/constants';
import { getSizeOfWordTileTable, getRandomWord } from 'src/utils';
import type { WordTileItem, WordTileGroup, WordTileTable } from 'src/utils/types';

import styles from './styles.module.scss';


interface IWordTileTableProps extends React.HTMLAttributes<HTMLDivElement> {
}

function WordTileTableComp({
  className,
  ...restProps
}: IWordTileTableProps): JSX.Element {
  const wordToCompare = React.useMemo<string>(() => getRandomWord(), []);
  // console.log("🚀 ~ file: index.tsx ~ line 19 ~ wordToCompare", wordToCompare)
  const wordTileArr = React.useMemo<WordTileTable>(() => getSizeOfWordTileTable(), []);
  // console.log("🚀 ~ file: index.tsx ~ line 21 ~ wordTileArr", wordTileArr)
  // compareTwoWords
  
  

  return (
    <div className={classNames(styles.container, className)} {...restProps}>
      {wordTileArr.map((wordTileSubArr: WordTileGroup): JSX.Element[] => (
        wordTileSubArr.value.map((wordTileItem: WordTileItem): JSX.Element => (
          <WordTile key={`${wordTileSubArr.key}-${wordTileItem.key}`}>
            {wordTileItem.value}
          </WordTile>
        ))
      ))}
    </div>
  )
}

export default WordTileTableComp