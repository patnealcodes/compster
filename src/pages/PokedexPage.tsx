import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PokemonEntry, Pokedex } from '../types/PokeAPI'
import { Link } from 'react-router-dom'

function getIDFromURL(url: string) {
  const re = new RegExp(/pokemon-species\/(\d+)\//)

  return re.exec(url) || [null, '?']
}

const PokedexPage = () => {
  const JOHTO = 3
  const [pokedex, setPokedex] = useState({} as Pokedex)

  // TODO: Set this up with Context
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokedex/${JOHTO}`)
    .then(({ data }: any) => {
      setPokedex(data)
    })
  }, [])

  return (
    <div>
      {pokedex.pokemon_entries && pokedex.pokemon_entries.map(({ pokemon_species }: PokemonEntry) => {
        const {url, name} = pokemon_species
        const dexID = getIDFromURL(url)[1]

        return (
          <div key={dexID}>
            <p>{name}</p>
            <Link to={`/pokemon/${dexID}`}>{dexID}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default PokedexPage
