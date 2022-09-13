import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

import search from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const handleClose = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };
  const [value, setValue] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 200),
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
