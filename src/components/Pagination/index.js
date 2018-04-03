import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export const PaginationDesktop = ({
  pageCount,
  offset,
  limit,
  loadAllPokemons,
}) => (
  <div>
    <Pagination bsSize="large">
      <Pagination.Prev />
      <Pagination.Item onClick={() => loadAllPokemons()}>1</Pagination.Item>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  </div>
);
