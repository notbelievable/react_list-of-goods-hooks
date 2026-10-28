import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sort = () => setSortType(sortType === 'alpha' ? '' : 'alpha');
  const sortLen = () => setSortType(sortType === 'len' ? '' : 'len');
  const reverse = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const sortedList = [...goodsFromServer];

  if (sortType === 'alpha') {
    sortedList.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'len') {
    sortedList.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alpha' ? 'is-light' : ''}`}
          onClick={sort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'len' ? 'is-light' : ''}`}
          onClick={sortLen}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === false ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortType !== '' || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        <ul>
          {sortedList.map((product, i) => (
            <li data-cy="Good" key={i}>
              {product}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
