import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.inner}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p>Sorry, this page is not available in our store.</p>
    </div>
  );
};
