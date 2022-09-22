import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSortName } from '../redux/filter/selectors';
import { setSelected } from '../redux/filter/slice';
import { SortPropertyEnum } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const sortList: SortItem[] = [
  { name: 'popular (descending)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'popular (ascending)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'price (descending)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'price (ascending)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'alphabet (descending)', sortProperty: SortPropertyEnum.NAME_DESC },
  { name: 'alphabet (ascending)', sortProperty: SortPropertyEnum.NAME_ASC },
];

export const SortPopup: React.FC = React.memo(() => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const selected = useSelector(selectSortName);

  const handleActiveSort = (obj: SortItem) => {
    dispatch(setSelected(obj));
    setVisible(false);
  };
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={visible ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setVisible(!visible)}>{selected}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => handleActiveSort(obj)}
                className={selected === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
