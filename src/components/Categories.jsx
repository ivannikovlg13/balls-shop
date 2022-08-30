import React from 'react';

const Categories = () => {
  const categories = ['All', 'Soccer', 'Futsal', 'Volleyball', 'Basketball', 'Kids'];
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
