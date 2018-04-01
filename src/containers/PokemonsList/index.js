import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Table } from 'react-bootstrap';
import { loadAllPokemons } from '../../actions/pokemons';
import { PokemonItem } from '../../components/PokemonItem';
import './style.scss';

class PokemonsList extends Component {
  componentDidMount() {
    this.props.loadAllPokemons();
  }

  render() {
    const { pokemons } = this.props;
    return (
      <div className="pokemons-list">
        <h1 className="pokemons-list__title">Pokemons</h1>
        <Panel className="pokemons-list__panel">
          <Panel.Body>
            <Table bordered condensed hover className="pokemons-list__table">
              <thead className="pokemons-list__table-header">
                <tr>
                  <th>Thumbnail</th>
                  <th>Name</th>
                  <th>Weight</th>
                  <th>Base expirience</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map(pokemon => {
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
              </tbody>
            </Table>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default connect(({ pokemons }) => ({ pokemons }), { loadAllPokemons })(
  PokemonsList,
);
