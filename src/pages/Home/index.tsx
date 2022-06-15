import React from 'react';
import Header from 'src/components/Header';
import WordTileTable from 'src/components/WordTileTable';
import VirtualKeyboard from 'src/components/VirtualKeyboard';

import styles from './styles.module.scss';

function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      <WordTileTable />
      <VirtualKeyboard />
    </div>
  );
}

export default Home;
