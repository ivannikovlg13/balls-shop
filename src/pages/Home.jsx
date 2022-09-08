import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { setFilters } from '../redux/slices/filterSlice';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import BallBlock from '../components/BallBlock';
import LoadingBlock from '../components/BallBlock/LoadingBlock';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { activeCategoryId, sort, currentPage } = useSelector((state) => state.filter);
  const selectedSort = sort.sortProperty;
  const balls = items.map((obj) => <BallBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, index) => <LoadingBlock key={index} />);
  const fetchBalls = () => {
    setIsLoading(true);
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const sortBy = `${selectedSort.replace('-', '')}`;
    const order = `${selectedSort.includes('-') ? `asc` : `desc`}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://630e35b2109c16b9abf71c53.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
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
      fetchBalls();
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
      <div className="content__items">{isLoading ? skeleton : balls}</div>
      <Pagination currentPage={currentPage} />
    </>
  );
};

export default Home;
