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

enum SortEnum {
  None = '',
  Alpha = 'alpha',
  Length = 'len',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortEnum>(SortEnum.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const sort = () =>
    setSortType(sortType === SortEnum.Alpha ? SortEnum.None : SortEnum.Alpha);
  const sortLen = () =>
    setSortType(sortType === SortEnum.Length ? SortEnum.None : SortEnum.Length);
  const reverse = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortType(SortEnum.None);
    setIsReversed(false);
  };

  const sortedList = [...goodsFromServer];

  if (sortType === SortEnum.Alpha) {
    sortedList.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortEnum.Length) {
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
          className={`button is-info ${sortType !== SortEnum.Alpha ? 'is-light' : ''}`}
          onClick={sort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortEnum.Length ? 'is-light' : ''}`}
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

        {sortType !== SortEnum.None || isReversed ? (
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
