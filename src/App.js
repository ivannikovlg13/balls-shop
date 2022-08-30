import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import BallBlock from './components/BallBlock';
import data from './assets/data.json';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">ALL BALLS</h2>
          <div className="content__items">
            {data.balls.map((obj) => (
              <BallBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
