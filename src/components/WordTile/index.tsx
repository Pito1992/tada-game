import React from 'react';
import classNames from 'classnames';

import { WORD_TILE_STATE } from 'src/constants';

import styles from './styles.module.scss';

interface IWordTileProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: WORD_TILE_STATE
}

function WordTileComp({
  children = null,
  className,
  state,
  ...restProps
}: IWordTileProps): JSX.Element {
  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.animation]: children
        },
        className
      )}
      {...(state && { 'data-state': state })}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default WordTileComp