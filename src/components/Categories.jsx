import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = ['All', 'Soccer', 'Futsal', 'Volleyball', 'Basketball', 'Kids'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
