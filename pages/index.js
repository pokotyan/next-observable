import React, {Component} from "react";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import shortid from 'shortid';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import * as pokemonActions from "./actions/pokemon";
import style from "./style.css";

class App extends Component {
  state = {
    name: '',
    suggestions: []
  };

  componentDidMount = () => {
    const { pokemonActions: { fetchPokemons } } = this.props;

    fetchPokemons({
      first: 151
    });
  }

  handleChange = e => {
    const inputName = e.target.value;
    const { pokemon: { pokemons } } = this.props;
    const suggestions = [
      ...pokemons.filter(pokemon => pokemon.name.includes(inputName)),
      ...pokemons.filter(pokemon => pokemon.jname.includes(inputName))
    ];

    this.setState({
      suggestions: _.uniqBy(suggestions, 'id')
    });
  }

  render() {
    const {
      pokemon: { pokemon, pokemons, isFetching }
    } = this.props;

    const { suggestions } = this.state;

    return (
      <div>
        <div className={style.search}>
          {
            isFetching
            ? <CircularProgress />
            : <input
              placeholder="ポケモンの名前"
              type="text"
              onChange={this.handleChange}
            />
          }
        </div>
        <div className={style.container}>
          {suggestions.map(pokemon => {
            const skills = pokemon.attacks && pokemon.attacks.special.map(special => special.name).join(',');
            const evolutions = pokemon.evolutions && pokemon.evolutions.map(evolution => evolution.name).join(',')

            return (
              <Tooltip
                title={
                  <div>
                    <div>わざ:{skills}</div>
                    <div>進化:{evolutions}</div>
                    <div>HP:{pokemon.base.hp}</div>
                    <div>攻撃:{pokemon.base.atk}</div>
                    <div>防御:{pokemon.base.def}</div>
                    <div>特攻:{pokemon.base.spAtk}</div>
                    <div>特防:{pokemon.base.spDef}</div>
                    <div>素早さ:{pokemon.base.speed}</div>
                  </div>
                }
                key={shortid.generate()}
              >
                <div className={style.row}>
                  <span className={style.name}>{`${pokemon.jname}:${pokemon.name}`}</span>
                  <div className={style.imgBox}>
                    <img src={pokemon.gif} />
                  </div>
                </div>
              </Tooltip>
            )            
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pokemon: state.pokemon,
});

const mapDispatchToProps = dispatch => ({
  pokemonActions: bindActionCreators(pokemonActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));