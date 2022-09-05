import React from 'react';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage }) => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.wrapper}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
