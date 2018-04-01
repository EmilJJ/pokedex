import React from 'react';

import './style.scss';

export const PokemonItem = ({
  name,
  thumbnail,
  weight,
  height,
  baseExperience,
  ...restProps
}) => (
  <tr className="pokemon-item" {...restProps}>
    <td>
      <img src={thumbnail} alt="pockemon thumbnail" />
    </td>
    <td>{name.toUpperCase()}</td>
    <td>{weight}</td>
    <td>{baseExperience}</td>
    <td>{height}</td>
  </tr>
);
