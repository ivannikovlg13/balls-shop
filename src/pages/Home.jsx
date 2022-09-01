import React from 'react';
import { useSelector } from 'react-redux';

import Sort from '../components/Sort';
import BallBlock from '../components/BallBlock';
import LoadingBlock from '../components/BallBlock/LoadingBlock';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [indexPage, setIndexPage] = React.useState(1);
  const [selectedSort, setSelectedSort] = React.useState({
    name: 'popular(descending)',
    sortProperty: 'rating',
  });
  const activeCategoryId = useSelector((state) => state.filter.initialActiveCategory);
  const balls = items.map((obj) => <BallBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, index) => <LoadingBlock key={index} />);

  React.useEffect(() => {
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const sortBy = `${selectedSort.sortProperty.replace('-', '')}`;
    const order = `${selectedSort.sortProperty.includes('-') ? `asc` : `desc`}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsLoading(true);
    fetch(
      `https://630e35b2109c16b9abf71c53.mockapi.io/items?&page=${indexPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategoryId, selectedSort, searchValue, indexPage]);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort selected={selectedSort} setSelected={setSelectedSort} />
      </div>
      <h2 className="content__title">ALL BALLS</h2>
      <div className="content__items">{isLoading ? skeleton : balls}</div>
      <Pagination onChangePage={(i) => setIndexPage(i)} />
    </>
  );
};

export default Home;
