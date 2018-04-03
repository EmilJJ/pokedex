import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import {
  changeRangeUp,
  changeRangeDown,
  goToFirstPage,
  goToLastPage,
} from '../../actions/pokemons';
import config from '../../../config';

const { pagination: { range_offset } } = config;

const PaginationElements = (begin, activePage, loadPokemons) => {
  const items = [];

  const active = activePage || 1;

  for (let i = begin; i <= begin + range_offset; i += 1) {
    items.push(
      <Pagination.Item
        onClick={() => loadPokemons(i)}
        active={active === i}
        key={i}>
        {i}
      </Pagination.Item>,
    );
  }

  return items;
};

const PaginationDesktop = ({
  pageCount,
  begin,
  loadPokemons,
  changeRangeDown,
  changeRangeUp,
  goToFirstPage,
  goToLastPage,
  activePage,
}) => (
  <div>
    <Pagination bsSize="large">
      <Pagination.First
        onClick={() => {
          if (begin === 1) return true;
          goToFirstPage();
          return loadPokemons(1);
        }}
      />
      <Pagination.Prev
        onClick={() => {
          if (begin === 1) return true;
          return changeRangeDown();
        }}
      />
      {PaginationElements(begin, activePage, loadPokemons)}
      <Pagination.Next
        onClick={() => {
          if (begin + 2 === pageCount || begin + 2 > pageCount) return true;
          return changeRangeUp();
        }}
      />
      <Pagination.Last
        onClick={() => {
          if (begin + 2 === pageCount) return true;
          goToLastPage(pageCount);
          return loadPokemons(pageCount);
        }}
      />
    </Pagination>
  </div>
);

export default connect(null, {
  changeRangeUp,
  changeRangeDown,
  goToFirstPage,
  goToLastPage,
})(PaginationDesktop);
