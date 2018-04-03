import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Panel } from 'react-bootstrap';
import { Table } from '../../components/Table';
import { PaginationDesktop } from '../../components/Pagination';
import { loadAllPokemons, loadPokemonsByType } from '../../actions/pokemons';
import { PokemonItem } from '../../components/PokemonItem';
import { FilterDropdown } from '../../components/Dropdown';
import { loadTypes } from '../../actions/types';
import './style.scss';

class PokemonsList extends Component {
  componentDidMount() {
    const { pagination } = this.props.pokemons;
    const { offset, limit } = pagination;
    const { loadAllPokemons, loadTypes } = this.props;

    loadAllPokemons(offset, limit);
    loadTypes();
  }

  render() {
    const { list } = this.props.pokemons;
    const { loadPokemonsByType, loadAllPokemons, types, goTo } = this.props;
    const { type } = this.props.pokemonFilter;
    const { pagination: { count, offset } } = this.props.pokemons;

    return (
      <div className="pokemons-list">
        <FilterDropdown
          loadPokemonsByType={loadPokemonsByType}
          loadAllPokemons={loadAllPokemons}
          items={types}
          title={type}
        />
        <h1 className="pokemons-list__title">Pokedex</h1>
        <Panel className="pokemons-list__panel">
          <Panel.Body>
            <Table
              responsive
              hover
              className="pokemons-list"
              columns={[
                'Thumbnail',
                'Name',
                'Weight',
                'Base expirience',
                'Height',
              ]}
              rows={list.map(pokemon => {
                const {
                  id,
                  name,
                  weight,
                  height,
                  base_experience,
                  sprites: { front_default },
                } = pokemon;

                return (
                  <PokemonItem
                    onClick={() => goTo(`/pokemon/${id}`)}
                    key={id}
                    name={name}
                    weight={weight}
                    height={height}
                    baseExperience={base_experience}
                    thumbnail={front_default}
                  />
                );
              })}
            />
          </Panel.Body>
        </Panel>
        {type === 'ALL' ? (
          <div>
            <PaginationDesktop
              loadAllPokemons={loadAllPokemons}
              pageCount={count / 20}
              offset={offset}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  ({ pokemons: { pokemonsList: pokemons, pokemonFilter }, types }) => ({
    pokemonFilter,
    pokemons,
    types,
  }),
  {
    loadAllPokemons,
    loadPokemonsByType,
    loadTypes,
    goTo: path => push(path),
  },
)(PokemonsList);
