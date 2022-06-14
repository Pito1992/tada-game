import React from 'react';
import Heading from 'src/components/Heading';
import CountDownTimer from 'src/components/CountDownTimer';

import styles from './styles.module.scss';

function HeaderComp(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>  
        <CountDownTimer className={styles.timer} />
        <Heading tag="h1" className={styles.heading}>Wordle</Heading>
      </div>
    </div>
  )
}

export default HeaderComp