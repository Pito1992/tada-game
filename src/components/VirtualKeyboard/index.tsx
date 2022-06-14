import React from 'react';
import classNames from 'classnames';
import VirtualKey from 'src/components/VirtualKey';

import { getVirtualKeyboardKeys } from 'src/utils';
import type { VirtualKeyboardKeys } from 'src/utils/types';

import styles from './styles.module.scss';

interface IVirtualKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
}

function VirtualKeyboardComp({
  children,
  className,
  ...restProps
}: IVirtualKeyboardProps): JSX.Element {
  const virtualKeyboardKeys = React.useMemo<VirtualKeyboardKeys>(() => getVirtualKeyboardKeys(), []);

  React.useEffect(() => {
    function handleKeyDown(e: any) {
      if (e.keyCode === 13) {
        // Enter
      } else if (e.keyCode === 8) {
        // Cancel
      } else {
        const char = String.fromCharCode(e.keyCode);
        if (/[A-Za-z]/.test(char)) {
          // Alphabet
          console.log(char);
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  
  return (
    <div className={classNames(styles.container, className)} {...restProps}>
      {Object.entries(virtualKeyboardKeys).map(([key, keyList]): JSX.Element => (
        <div key={key} className={styles.keyGroup}>
          {keyList.map((keyItem): JSX.Element => (
            <VirtualKey key={`${key}-${keyItem}`} value={keyItem} isSpecialKey={/^btn-/gi.test(keyItem)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default VirtualKeyboardComp