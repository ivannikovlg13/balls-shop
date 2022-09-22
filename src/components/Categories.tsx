import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeCategory } from '../redux/filter/slice';
import { selectActiveCategoryId } from '../redux/filter/selectors';

const categories = ['All', 'Soccer', 'Futsal', 'Volleyball', 'Basketball', 'Kids'];

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const value = useSelector(selectActiveCategoryId);
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
});

export default Categories;
