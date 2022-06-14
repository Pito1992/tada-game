import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

function ButtonComp({
  children,
  className,
  ...restProps
}: IButtonProps): JSX.Element {
  return (
    <button className={classNames(styles.button, className)} {...restProps}>
      {children}
    </button>
  )
}

export default ButtonComp