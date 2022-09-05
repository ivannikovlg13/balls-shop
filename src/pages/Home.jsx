import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Sort from '../components/Sort';
import BallBlock from '../components/BallBlock';
import LoadingBlock from '../components/BallBlock/LoadingBlock';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { activeCategoryId, sortBy, currentPage } = useSelector((state) => state.filter);
  const selectedSort = sortBy.selected;
  const balls = items.map((obj) => <BallBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, index) => <LoadingBlock key={index} />);

  React.useEffect(() => {
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const sortBy = `${selectedSort.sortProperty.replace('-', '')}`;
    const order = `${selectedSort.sortProperty.includes('-') ? `asc` : `desc`}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsLoading(true);
    axios
      .get(
        `https://630e35b2109c16b9abf71c53.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
