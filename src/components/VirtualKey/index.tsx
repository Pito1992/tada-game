import React from 'react';
import classNames from 'classnames';
import { SPECIAL_KEY } from 'src/constants';

import { ReactComponent as IconBackSpace } from 'src/assets/images/backspace.svg';

import styles from './styles.module.scss';

const SPECIAL_KEY_MAPPING = {
  [SPECIAL_KEY.BTN_ENTER]: 'Enter',
  [SPECIAL_KEY.BTN_CANCEL]: <IconBackSpace />,
}

interface IVirtualKeyProps extends React.HTMLAttributes<HTMLButtonElement> {
  isSpecialKey?: boolean;
  value: string;
}

function VirtualKeyComp({
  value,
  className,
  children,
  isSpecialKey,
  ...restProps
}: IVirtualKeyProps): JSX.Element {
  const handleKeyClick = () => {
    switch (value) {
      case SPECIAL_KEY.BTN_ENTER:
        console.log(SPECIAL_KEY.BTN_ENTER)
        break;
      case SPECIAL_KEY.BTN_CANCEL:
        console.log(SPECIAL_KEY.BTN_CANCEL)
        break;
      default:
        console.log(value)
        break;
    }
  }

  return (
    <button className={classNames(styles.container, {
      [styles.fluidWidth]: isSpecialKey,
    }, className)}
      onClick={handleKeyClick}
      {...restProps}
    >
      {isSpecialKey
        ? SPECIAL_KEY_MAPPING[value as keyof typeof SPECIAL_KEY_MAPPING]
        : value}
    </button>
  )
}

export default VirtualKeyComp