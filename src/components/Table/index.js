import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

export const Table = ({ columns, rows, className, ...restProps }) => (
  <BootstrapTable {...restProps} className={`${className}__table`}>
    <thead className={`${className}__table-header`}>
      <tr>{columns.map(col => <th key={col}>{col}</th>)}</tr>
    </thead>
    <tbody>{rows}</tbody>
  </BootstrapTable>
);
1;
