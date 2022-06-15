import React from 'react';
import classNames from 'classnames';
import Portal from 'src/components/Portal';

import styles from './styles.module.scss';

interface INotifyProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
}

function NotifyComp({
  children,
  className,
  onClose,
  ...restProps
}: INotifyProps): JSX.Element | null {
  const [isVisible, setVisible] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose?.();
      setVisible(false);
      clearTimeout(timeOutId);
    }, 1000);

    return () => {
      setVisible(true);
      clearTimeout(timeOutId);
    }
  }, [children, onClose]);

  if (!isVisible) return null;

  return (
    <Portal>
      <div className={classNames(styles.container, className)} {...restProps}>
        {
          Array.isArray(children)
            ? React.Children.map(children, (child) => <div className={styles.notify}>{child}</div>)
            : <div className={styles.notify}>{children}</div>
        }
      </div>
    </Portal>
  )
}

export default NotifyComp