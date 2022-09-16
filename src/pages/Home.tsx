import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import { selectBalls } from '../redux/slices/ballsSlice';
import { fetchBalls } from '../redux/slices/ballsSlice';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import BallBlock from '../components/BallBlock';
import LoadingBlock from '../components/BallBlock/LoadingBlock';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import errorImg from '../assets/img/error.svg';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { activeCategoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectBalls);
  const selectedSort = sort.sortProperty;
  const balls = items.map((obj: any) => <BallBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, index) => <LoadingBlock key={index} />);

  const getBalls = async () => {
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const sortBy = `${selectedSort.replace('-', '')}`;
    const order = `${selectedSort.includes('-') ? `asc` : `desc`}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchBalls({
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategoryId,
        currentPage,
        sortProperty: selectedSort,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategoryId, selectedSort, currentPage]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getBalls();
    }
    isSearch.current = false;
  }, [activeCategoryId, selectedSort, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">ALL BALLS</h2>
      {status === 'error' ? (
        <div className="cart--error">
          <h2>An error has occurred 😕</h2>
          <p>
            Sorry, we couldn't get the balls.
            <br />
            Please try a little later.
          </p>
          <img src={errorImg} alt="Empty cart" />
        </div>
      ) : (
        <div className="content__items">{status === 'success' ? balls : skeleton}</div>
      )}

      <Pagination currentPage={currentPage} />
    </>
  );
};

export default Home;
