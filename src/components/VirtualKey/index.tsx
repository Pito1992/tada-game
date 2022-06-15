import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { SPECIAL_KEY, WORD_TILE_STATE } from 'src/constants';
import type { RootState } from 'src/redux/interfaces';
import { wordTileAccumulatorSelector } from 'src/redux/wordTile/selectors';
import { ReactComponent as IconBackSpace } from 'src/assets/images/backspace.svg';
import styles from './styles.module.scss';

const SPECIAL_KEY_MAPPING = {
  [SPECIAL_KEY.BTN_ENTER]: 'Enter',
  [SPECIAL_KEY.BTN_CANCEL]: <IconBackSpace />,
}

interface IVirtualKeyProps extends React.HTMLAttributes<HTMLButtonElement> {
  isSpecialKey?: boolean;
  value: string;
  actions?: {
    onPressAlphabet: (value: string) => void;
    onPressEnter: () => void;
    onPressCancel: () => void;
  },
}

function VirtualKeyComp({
  value,
  className,
  children,
  isSpecialKey,
  actions,
  ...restProps
}: IVirtualKeyProps): JSX.Element {
  const accumulator = useSelector<RootState, any>(wordTileAccumulatorSelector);
  const state = accumulator[value.toLowerCase()];
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (value) {
      case SPECIAL_KEY.BTN_ENTER:
        actions?.onPressEnter();
        break;
      case SPECIAL_KEY.BTN_CANCEL:
        actions?.onPressCancel();
        break;
      default:
        actions?.onPressAlphabet(value);
        break;
    }
  }

  return (
    <button className={classNames(styles.container, {
      [styles.fluidWidth]: isSpecialKey,
      [styles[state]]: state
    }, className)}
      onClick={onClick}
      {...restProps}
    >
      {isSpecialKey
        ? SPECIAL_KEY_MAPPING[value as keyof typeof SPECIAL_KEY_MAPPING]
        : value}
    </button>
  )
}

export default VirtualKeyComp