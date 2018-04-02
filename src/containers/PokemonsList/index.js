import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { Table } from '../../components/Table';
import PaginationDesktop from '../Pagination';
import { loadAllPokemons, loadPokemonsByType } from '../../actions/pokemons';
import { PokemonItem } from '../../components/PokemonItem';
import { FilterDropdown } from '../../components/Dropdown';
import { loadTypes } from '../../actions/types';
import './style.scss';

class PokemonsList extends Component {
  constructor(props) {
    super(props);
    this.state = { pagination: 0 };
  }

  componentDidMount() {
    const { pagination } = this.props.pokemons;
    const { offset, limit } = pagination;
    this.props.loadAllPokemons(offset, limit);
    this.props.loadTypes();
  }

  componentWillReceiveProps(nextProps) {
    const { count } = this.props.pokemons;
    const { count: nextCount } = nextProps.pokemons;
    if (count < nextCount) {
      this.definePagination(nextCount);
    }
  }

  definePagination(count) {
    this.setState({ pagination: count / 20 });
  }

  render() {
    const { list } = this.props.pokemons;
    const { loadPokemonsByType, loadAllPokemons, types } = this.props;
    const { type } = this.props.pokemonFilter;
    const { pagination } = this.state;

    return (
      <div className="pokemons-list">
        <FilterDropdown
          loadPokemonsByType={loadPokemonsByType}
          loadAllPokemons={loadAllPokemons}
          items={types}
          title={type}
        />
        <h1 className="pokemons-list__title">....</h1>
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
            <PaginationDesktop pageCount={pagination} />
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
  },
)(PokemonsList);
