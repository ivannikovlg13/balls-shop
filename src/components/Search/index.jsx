import React from 'react';
import styles from './Search.module.scss';
import search from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';

const Search = ({ searchValue, setSearchValue }) => {
  const handleClose = () => {
    setSearchValue('');
  };
  return (
    <div className={styles.root}>
      <img className={styles.iconSearch} src={search} alt="search" />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Search balls..."
      />
      {searchValue && (
        <img onClick={handleClose} className={styles.iconClose} src={close} alt="close" />
      )}
    </div>
  );
};

export default Search;
