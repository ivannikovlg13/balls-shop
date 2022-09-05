import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import search from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';
import { SearchContext } from '../../App';

const Search = () => {
  const inputRef = React.useRef();
  const handleClose = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );
  const handleSearchValue = (str) => {
    updateSearchValue(str);
    setValue(str);
  };
  return (
    <div className={styles.root}>
      <img className={styles.iconSearch} src={search} alt="search" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => handleSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Search balls..."
      />
      {value && <img onClick={handleClose} className={styles.iconClose} src={close} alt="close" />}
    </div>
  );
};

export default Search;
