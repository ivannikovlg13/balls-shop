import React from 'react';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/filter/slice';
import { useDispatch } from 'react-redux';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
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
    />
  );
};

export default Pagination;
