import React, {useEffect, useState, useContext} from 'react'
import axios, { AxiosResponse } from 'axios'

import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { Pokemon, PokemonType } from '../types/PokeAPI'
import TypeBadge from '../components/shared/TypeBadge'
import { CompsterContext } from '../contexts/CompsterContext';

interface PokemonCardProps {
  info: Pokemon
}

const PokemonCard = ({ info }: PokemonCardProps) => {
  const {
    name,
    types,
    sprites
  } = info

  const { state, dispatch } = useContext(CompsterContext)

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

  const TeamControls = () => {
    if( state.currentTeam.find(id => id === info.id) ) {
      return (<>
        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch({
              type: 'removeFromTeam',
              payload: { id: info.id }
            })
          }}
        >
          <RemoveIcon />
        </IconButton>
        <span>Remove {info.name} from Team</span>
      </>)
    } else {
      return (<>
        <IconButton
          aria-label="add"
          disabled={state.currentTeam.length >= 6}
          title={state.currentTeam.length >= 6 ? 'Team full!' : `Add ${info.name} to Team`}
          onClick={() => {
            dispatch({
              type: 'addToTeam',
              payload: { id: info.id }
            })
          }}
        >
          <AddIcon />
        </IconButton>
        <span>Add {info.name} to Team</span>
      </>)
    }
  }

  return (
    <>
      <TeamControls />
      <div>
        <img
          alt={name}
          src={sprites.other['official-artwork'].front_default}
          style={{ maxWidth: '100%  ' }}
        />
      </div>
      <h1>{name.toUpperCase()}</h1>
      <ul>
        <li>Type{types.length > 1 && 's'}: {renderTypesList()}</li>
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
