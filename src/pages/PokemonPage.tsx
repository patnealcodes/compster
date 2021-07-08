import React, {useEffect, useState} from 'react'
import axios, { AxiosResponse } from 'axios'

import { Pokemon, PokemonType } from '../types/PokeAPI'
import TypeBadge from '../components/shared/TypeBadge'

interface PokemonCardProps {
  info: Pokemon
}

const PokemonCard = ({ info }: PokemonCardProps) => {
  const {
    name,
    types,
    sprites
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
          <li style={styles}>
            <TypeBadge
              key={i}
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
    <>
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

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then(({ data }: AxiosResponse<Pokemon>) => {
      setPokemon(data)
    })
  }, [pokemonID])
  return (
    <div>
      {pokemon ? (
        <PokemonCard info={pokemon} />
      ) : 'Loading...'}
    </div>
  )
}

export default PokemonPage
