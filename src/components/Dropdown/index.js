import React from 'react';

import './style.scss';

export const FilterDropdown = ({
  items,
  title,
  loadPokemons,
  loadPokemonsByType,
}) => (
  <div className="dropdown filter-type">
    <button className="dropbtn">{title}</button>
    <div className="dropdown-content">
      <a role="button" onClick={() => loadPokemons()}>
        ALL
      </a>
      {items.map(item => (
        <a
          role="button"
          id={item.name}
          onClick={() => loadPokemonsByType(item.name)}
          key={item.name}>
          {item.name.toUpperCase()}
        </a>
      ))}
    </div>
  </div>
);
