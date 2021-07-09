import {useEffect, useState, useContext} from 'react'
import axios, { AxiosResponse } from 'axios'

import { capitalize, Typography, Paper, makeStyles, createStyles } from '@material-ui/core';

import { Pokemon, PokemonType } from '../types/PokeAPI'
import { getPrimaryColorFromTypes, TeamControls } from '../helpers/helpers';

import TypeBadge from '../components/shared/TypeBadge'
import { CompsterContext } from '../contexts/CompsterContext';
import StatsChart from '../components/StatsChart/StatsChart';
import CurrentTeamBar from '../components/Teams/CurrentTeamBar';

interface PokemonCardProps {
  info: Pokemon
}

const useStyles = makeStyles(_ =>
  createStyles({
    nameBar: {
      alignItems: 'center',
      background: '#eee',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 0 1em',
      padding: '10px'
    },
    pokemonImage: {
      margin: '0 auto',
      maxWidth: '75%',
      transform: 'scaleX(-1)'
    }
  }),
)

const PokemonCard = ({ info }: PokemonCardProps) => {
  const {
    name,
    types,
    sprites,
    stats
  } = info

  const classes = useStyles();

  function renderTypesList() {
    function renderTypes() {
      return types.map(({ type }: PokemonType, i: number) => {
        const styles = {
          display: 'inline-block',
          paddingLeft: 0 as number | string
        }

        if( i !== 0 ) styles['paddingLeft'] = '.5em'

        return (
          <li key={i} style={styles}>
            <TypeBadge
              type={type.name}
            />
          </li>
        )
      })
    }

    return (
      <ul
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {renderTypes()}
      </ul>
    )
  }

  return (
    <div style={{ marginBottom: '84px' }}>
      <div style={{ display: 'flex' }}>
        <img
          alt={name}
          src={sprites.other['official-artwork'].front_default}
          className={classes.pokemonImage}
        />
      </div>
      <Paper elevation={3} className={classes.nameBar}>
        <Typography variant="h5">{capitalize(name)}</Typography>
        <TeamControls id={info.id} name={info.name} />
      </Paper>
      <ul style={{ margin: 0, padding: 0 }}>
        <li>{renderTypesList()}</li>
        <li>
          <StatsChart stats={stats} typeColor={getPrimaryColorFromTypes(types)} />
        </li>
      </ul>
      <CurrentTeamBar />
    </div>
  )
}

const PokemonPage = ({match}: any) => {
  const pokemonID = match.params.id
  const [pokemon, setPokemon] = useState(null as Pokemon | null)
  const { state, dispatch } = useContext(CompsterContext)

  useEffect(() => {
    if( state.cachedPokemon && !state.cachedPokemon[pokemonID] ) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then(({ data }: AxiosResponse<Pokemon>) => {
        setPokemon(data)
        dispatch({
          type: 'cachePokemon',
          payload: {
            pokemon: data
          }
        })
      })
    } else {
      setPokemon(state.cachedPokemon[pokemonID])
    }
  }, [pokemonID, state, dispatch])

  return (
    <div>
      {pokemon ? (
        <PokemonCard info={pokemon} />
      ) : 'Loading...'}
    </div>
  )
}

export default PokemonPage
