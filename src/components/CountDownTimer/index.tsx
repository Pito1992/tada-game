import React from 'react';
import classNames from 'classnames';
import { formatTimer } from 'src/utils';

import styles from './styles.module.scss';

interface ICountDownTimerProps extends React.HTMLAttributes<HTMLDivElement> {}

const COUNT_DOWN_TIMER = 330;
const MIN_TO_SEC = 60;

function CountDownTimerComp({
  className
}: ICountDownTimerProps): JSX.Element {
  const [timer, setTimer] = React.useState<number>(COUNT_DOWN_TIMER);
  const second = timer % MIN_TO_SEC;
  const minute = (timer - second) / MIN_TO_SEC;

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (timer) {
        setTimer(timer - 1);
      } else {
        clearTimeout(timeOutId);
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [timer]);

  return (
    <div className={classNames(styles.container, className)}>
      <time>{`${formatTimer(minute)}:${formatTimer(second)}`}</time>
    </div>
  )
}

export default CountDownTimerComp