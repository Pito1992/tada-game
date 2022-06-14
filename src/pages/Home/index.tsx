import React from 'react';
import Header from 'src/components/Header';
import Modal from 'src/components/Modal';
import WordTileTable from 'src/components/WordTileTable';
import VirtualKeyboard from 'src/components/VirtualKeyboard';

import styles from './styles.module.scss';

function Home(): JSX.Element {
  const [isShowModal, setShowModal] = React.useState<boolean>(true);

  return (
    <div className={styles.container}>
      <Header />
      <WordTileTable />
      <button onClick={() => setShowModal(true)}>test</button>
      <VirtualKeyboard />
      <Modal visible={isShowModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Home;
