import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import VirtualKey from 'src/components/VirtualKey';
import Notify from 'src/components/Notify';
import Modal from 'src/components/Modal';
import { WORD_TILE_TABLE, LIST_OF_NOTIFY_WINNER } from 'src/constants';
import { getCurrentTime, getWordTileStateByAttempt, getRandomNumber, getVirtualKeyboardKeys } from 'src/utils';
import { updateCharToWordTileRow } from 'src/redux/wordTile/actions';
import { verifyWordTileRow } from 'src/redux/wordTile/actions';
import { wordTileMetadataSelector, wordTileErrorSelector, wordTileDataSelector } from 'src/redux/wordTile/selectors';
import type { VirtualKeyboardKeys, WordTileTable } from 'src/utils/types';
import type { RootState } from 'src/redux/interfaces';

import styles from './styles.module.scss';

interface IVirtualKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
}

function VirtualKeyboardComp({
  children,
  className,
  ...restProps
}: IVirtualKeyboardProps): JSX.Element {
  const dispatch = useDispatch();
  const { attempt, tempWord = '', isGuessWordSuccessfully, isDisabled } = useSelector<RootState, any>(wordTileMetadataSelector);
  const wordTileArr = useSelector<RootState, WordTileTable>(wordTileDataSelector);
  const error = useSelector<RootState, unknown>(wordTileErrorSelector);
  const [errorCounter, countError] = React.useState<number>(1);
  const [isShowModal, setShowModal] = React.useState<boolean>(true);
  const virtualKeyboardKeys = React.useMemo<VirtualKeyboardKeys>(() => getVirtualKeyboardKeys(), []);
  const isExceedMaximumAttemptTimes = attempt >= WORD_TILE_TABLE.COL - 1;

  const onCloseModal = () => {
    setShowModal(false);
  }

  const onCloseNotify = () => {
    countError(1);
  }

  const onPressAlphabet = (value: string): void => {
    if (!isDisabled && /[A-Za-z]/g.test(value)) {
      dispatch(updateCharToWordTileRow(
        tempWord.length < WORD_TILE_TABLE.ROW
          ? tempWord + value
          : tempWord,
        attempt
      ));
    }
  }

  const onPressCancel = () => {
    if (!isDisabled) {
      dispatch(updateCharToWordTileRow(
        tempWord.length > 0
          ? tempWord.substring(0, tempWord.length - 1)
          : tempWord,
        attempt
      ));
    }
  }

  const onPressEnter = () => {
    if (!isDisabled) {
      dispatch(verifyWordTileRow());
      error && countError((prevState) => prevState < 10 ? prevState + 1 : prevState);
    }
  }

  React.useEffect(() => {
    setShowModal(isExceedMaximumAttemptTimes || isGuessWordSuccessfully);
  }, [isExceedMaximumAttemptTimes, isGuessWordSuccessfully]);

  React.useEffect(() => {
    dispatch(updateCharToWordTileRow(tempWord, attempt));
  }, [dispatch, attempt, tempWord])
  
  React.useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        onPressEnter();
      } else if (e.keyCode === 8) {
        onPressCancel();
      } else {
        const char = String.fromCharCode(e.keyCode);
        onPressAlphabet(char);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onPressAlphabet, onPressCancel, onPressEnter]);
  
  return (
    <div className={classNames(styles.container, className)} {...restProps}>
      {(!isExceedMaximumAttemptTimes && error) && (
        <Notify onClose={onCloseNotify}>{[...Array(errorCounter)].fill(error)}</Notify>
      )}
      {isGuessWordSuccessfully && (
        <Notify>{LIST_OF_NOTIFY_WINNER[getRandomNumber(0, LIST_OF_NOTIFY_WINNER.length)]}</Notify>
      )}
      <Modal
        visible={isShowModal}
        onClose={onCloseModal}
        body={(
          <>
            <p>Wordle {getCurrentTime()} {attempt}/6</p>
            <p>
              {Array.from(getWordTileStateByAttempt(wordTileArr, attempt), wordTileRow => <>{wordTileRow} <br/></>)}
            </p>
          </>
        )}
      />
      {Object.entries(virtualKeyboardKeys).map(([key, keyList]): JSX.Element => (
        <div key={key} className={styles.keyGroup}>
          {keyList.map((keyItem): JSX.Element => (
            <VirtualKey
              actions={{
                onPressAlphabet,
                onPressEnter,
                onPressCancel,
              }}
              key={`${key}-${keyItem}`} 
              value={keyItem}
              isSpecialKey={/^btn-/gi.test(keyItem)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default VirtualKeyboardComp