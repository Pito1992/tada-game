import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { formatTimer } from 'src/utils';
import { createNewGame } from 'src/redux/wordTile/actions';
import styles from './styles.module.scss';

interface ICountDownTimerProps extends React.HTMLAttributes<HTMLDivElement> {}

const COUNT_DOWN_TIMER = 600;
const MIN_TO_SEC = 60;

function CountDownTimerComp({
  className
}: ICountDownTimerProps): JSX.Element {
  const dispatch = useDispatch();
  const [timer, setTimer] = React.useState<number>(COUNT_DOWN_TIMER);
  const second = timer % MIN_TO_SEC;
  const minute = (timer - second) / MIN_TO_SEC;

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (timer) {
        setTimer(timer - 1);
      } else {
        dispatch(createNewGame());
        setTimer(COUNT_DOWN_TIMER);
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [dispatch, timer]);

  return (
    <div className={classNames(styles.container, className)}>
      <time>{`${formatTimer(minute)}:${formatTimer(second)}`}</time>
    </div>
  )
}

export default CountDownTimerComp