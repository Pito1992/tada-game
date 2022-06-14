import React from 'react';
import classNames from 'classnames';
import Button from 'src/components/Button';
import Portal from 'src/components/Portal';
import { ReactComponent as IconClose } from 'src/assets/images/close.svg';
import { ReactComponent as IconShare } from 'src/assets/images/share.svg';

import styles from './styles.module.scss';

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose?: () => void;
}

function ModalComp({
  className,
  visible = false,
  onClose,
  ...restProps
}: IModalProps): JSX.Element | null {
  const handleOnClose = React.useCallback(() => {;
    onClose?.();
  }, [onClose]);

  if (!visible) return null;

  return (
    <Portal>
      <div className={styles.overlay} onClick={handleOnClose} />
      <div className={classNames(styles.modal, className)} {...restProps}>
        <Button className={styles.btnClose} onClick={handleOnClose}>
          <IconClose />
        </Button>
        <div className={styles.inner}>
          <div className={styles.body}>
            <Button className={styles.btnShare}>
              Share
              <IconShare />
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default ModalComp