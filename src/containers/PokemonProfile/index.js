import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Panel, Tab, Tabs } from 'react-bootstrap';
import { get } from 'lodash';
import { loadPokemonById } from '../../actions/pokemons';
import { Table } from '../../components/Table';

import './style.scss';

class PokemonProfile extends Component {
  componentWillMount() {
    const { id, loadPokemonById } = this.props;
    loadPokemonById(id);
  }
  render() {
    const { pokemon } = this.props;

    if (!pokemon) return null;

    const { sprites, name, weight, height, base_experience, stats } = pokemon;
    const { goTo } = this.props;

    return (
      <div className="pokemon-profile">
        <span
          role="button"
          className="pokemon-profile__button-close"
          onClick={() => goTo('/')}>
          <i className="material-icons">cancel</i>
        </span>
        <Panel className="pokemon-profile__panel">
          <Panel.Body>
            <div className="pokemon-profile__media">
              <figure className="pokemon-profile__cover">
                <p>
                  <img src={get(sprites, 'front_default', '')} alt="" />
                </p>
                <div className="pokemon-profile__cover-footer">
                  <figcaption>{name}</figcaption>
                  <span>
                    <i className="material-icons">grade</i>
                  </span>
                </div>
              </figure>
              <div className="pokemon-profile__base-info">
                <Tabs defaultActiveKey={1} id="pokemon-profile__tabs">
                  <Tab eventKey={1} title="Common">
                    <Table
                      responsive
                      className="pokemon-profile"
                      columns={['Weight', 'Height', 'Base expirience']}
                      rows={
                        <tr className="pokemon-profile__table-row">
                          <td>{weight}</td>
                          <td>{height}</td>
                          <td>{base_experience}</td>
                        </tr>
                      }
                    />
                  </Tab>
                  <Tab eventKey={2} title="Types">
                    <Table
                      responsive
                      className="pokemon-profile"
                      columns={['Slot', 'Type']}
                      rows={get(pokemon, 'types', ['']).map(tp => {
                        const { type: { name }, slot } = tp;
                        return (
                          <tr key={name} className="pokemon-profile__table-row">
                            <td>{`Slot-${slot}`}</td>
                            <td>{name}</td>
                          </tr>
                        );
                      })}
                    />
                  </Tab>
                  <Tab eventKey={3} title="Abilities">
                    <Table
                      responsive
                      className="pokemon-profile"
                      columns={['Slot', 'Ability', 'Is hidden']}
                      rows={get(pokemon, 'abilities', ['']).map(item => {
                        const { ability: { name }, slot, is_hidden } = item;
                        return (
                          <tr key={name} className="pokemon-profile__table-row">
                            <td>{`Slot-${slot}`}</td>
                            <td>{name}</td>
                            <td>{`${is_hidden}`}</td>
                          </tr>
                        );
                      })}
                    />
                  </Tab>
                  <Tab eventKey={4} title="Stats">
                    <Table
                      responsive
                      className="pokemon-profile"
                      columns={['Name', 'Base stat', 'Effort']}
                      rows={stats.map(stat => (
                        <tr
                          key={stat.stat.name}
                          className="pokemon-profile__table-row">
                          <td>{stat.stat.name}</td>
                          <td>{stat.base_stat}</td>
                          <td>{stat.effort}</td>
                        </tr>
                      ))}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { id } = props.params;
    const { pokemons: { currentPokemon } } = state;

    return {
      pokemon: currentPokemon,
      id,
    };
  },
  {
    goTo: path => push(path),
    loadPokemonById,
  },
)(PokemonProfile);
