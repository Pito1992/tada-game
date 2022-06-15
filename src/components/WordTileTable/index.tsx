import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import WordTile from 'src/components/WordTile';

import { createNewGame } from 'src/redux/wordTile/actions';
import { wordTileDataSelector } from 'src/redux/wordTile/selectors';
import type { RootState } from 'src/redux/interfaces';
import type { WordTileItem, WordTileGroup, WordTileTable } from 'src/utils/types';

import styles from './styles.module.scss';


interface IWordTileTableProps extends React.HTMLAttributes<HTMLDivElement> {
}

function WordTileTableComp({
  className,
  ...restProps
}: IWordTileTableProps): JSX.Element {
  const dispatch = useDispatch();
  const wordTileArr = useSelector<RootState, WordTileTable>(wordTileDataSelector);


  React.useEffect(() => {
    dispatch(createNewGame());
  }, [dispatch]);

  return (
    <div className={classNames(styles.container, className)} {...restProps}>
      {wordTileArr.map((wordTileSubArr: WordTileGroup): JSX.Element[] => (
        wordTileSubArr.value.map((wordTileItem: WordTileItem): JSX.Element => (
          <WordTile
            key={`${wordTileSubArr.key}-${wordTileItem.key}`}
            state={wordTileItem?.state}
          >
            {wordTileItem.value}
          </WordTile>
        ))
      ))}
    </div>
  );
}

export default WordTileTableComp