import React from 'react';

import Sort from '../components/Sort';
import BallBlock from '../components/BallBlock';
import LoadingBlock from '../components/BallBlock/LoadingBlock';
import Categories from '../components/Categories';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://630e35b2109c16b9abf71c53.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
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
