import React, {useEffect, useState, useContext} from 'react'
import axios, { AxiosResponse } from 'axios'

import { Pokemon, PokemonType, Type } from '../types/PokeAPI'
import TypeBadge from '../components/shared/TypeBadge'
import { CompsterContext } from '../contexts/CompsterContext';
import StatsChart from '../components/StatsChart/StatsChart';
import { TeamControls, TYPE_COLOR_MAP } from '../helpers/helpers';

interface PokemonCardProps {
  info: Pokemon
}

const PokemonCard = ({ info }: PokemonCardProps) => {
  const {
    name,
    types,
    sprites,
    stats
  } = info

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

  function getPrimaryColorFromTypes(types: PokemonType[]): Type {
    const name = types[0].type.name
    return TYPE_COLOR_MAP[name].primary as Type
  }

  return (
    <>
      <TeamControls id={info.id} name={info.name} />
      <div>
        <img
          alt={name}
          src={sprites.other['official-artwork'].front_default}
          style={{ margin: '0 auto', maxWidth: '75%', transform: 'scaleX(-1)' }}
        />
      </div>
      <h1>{name.toUpperCase()}</h1>
      <ul style={{ margin: 0, padding: 0 }}>
        <li>{renderTypesList()}</li>
        <li>
          <StatsChart stats={stats} typeColor={getPrimaryColorFromTypes(types)} />
        </li>
      </ul>
    </>
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
