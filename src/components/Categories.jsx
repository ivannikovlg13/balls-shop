import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeCategory } from '../redux/slices/filterSlice';

const Categories = () => {
  const categories = ['All', 'Soccer', 'Futsal', 'Volleyball', 'Basketball', 'Kids'];
  const dispatch = useDispatch();
  const value = useSelector((state) => state.filter.initialActiveCategory);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => dispatch(activeCategory(i))}
            className={value === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
