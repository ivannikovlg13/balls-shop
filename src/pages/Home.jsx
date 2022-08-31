import React from 'react';

import Sort from '../components/Sort';
import BallBlock from '../components/BallBlock';
import LoadingBlock from '../components/BallBlock/LoadingBlock';
import Categories from '../components/Categories';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategoryId, setActiveCategoryId] = React.useState(0);
  const [selectedSort, setSelectedSort] = React.useState({
    name: 'popular(descending)',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const sortBy = `${selectedSort.sortProperty.replace('-', '')}`;
    const order = `${selectedSort.sortProperty.includes('-') ? `asc` : `desc`}`;
    setIsLoading(true);
    fetch(
      `https://630e35b2109c16b9abf71c53.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategoryId, selectedSort]);
  return (
    <>
      <div className="content__top">
        <Categories value={activeCategoryId} onClickCategory={(id) => setActiveCategoryId(id)} />
        <Sort selected={selectedSort} setSelected={setSelectedSort} />
      </div>
      <h2 className="content__title">ALL BALLS</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(12)].map((_, index) => <LoadingBlock key={index} />)
          : items.map((obj) => <BallBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
