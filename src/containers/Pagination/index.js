import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pageCount } = this.props;
    const paginationItems = [];

    for (let i = 0; i < 2; i += 1) {
      paginationItems.push(
        <Pagination.Item key={i} active>
          {i + 1}
        </Pagination.Item>,
      );
    }

    return (
      <div>
        <Pagination bsSize="large">
          <Pagination.First />
          <Pagination.Prev />
          {paginationItems}
          {pageCount > 19 ? (
            <div>
              <Pagination.Ellipsis />
              <Pagination.Item>{Math.round(pageCount)}</Pagination.Item>
            </div>
          ) : null}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    );
  }
}

export default PaginationDesktop;
