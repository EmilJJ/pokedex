import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Panel } from 'react-bootstrap';
import { Table } from '../../components/Table';
import PaginationDesktop from '../../components/Pagination';
import { loadPokemons, loadPokemonsByType } from '../../actions/pokemons';
import { PokemonItem } from '../../components/PokemonItem';
import { FilterDropdown } from '../../components/Dropdown';
import { loadTypes } from '../../actions/types';
import './style.scss';

class PokemonsList extends Component {
  componentDidMount() {
    const { pagination } = this.props;
    const { page } = pagination;
    const { loadPokemons, loadTypes } = this.props;

    loadPokemons(page);
    loadTypes();
  }

  render() {
    const { pokemons } = this.props;
    const { loadPokemonsByType, loadPokemons, types, goTo } = this.props;
    const { type } = this.props.pokemonFilter;
    const { pagination: { count, begin, activePage } } = this.props;

    return (
      <div className="pokemons-list">
        <FilterDropdown
          loadPokemonsByType={loadPokemonsByType}
          loadPokemons={loadPokemons}
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
              rows={pokemons.map(pokemon => {
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
              loadPokemons={loadPokemons}
              activePage={activePage}
              pageCount={Math.round(count / 20)}
              begin={begin}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  ({ pokemons: { list: pokemons, pokemonFilter, pagination }, types }) => ({
    pokemonFilter,
    pagination,
    pokemons,
    types,
  }),
  {
    loadPokemons,
    loadPokemonsByType,
    loadTypes,
    goTo: path => push(path),
  },
)(PokemonsList);
