import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { PokemonEntry, Pokedex } from '../types/PokeAPI'

import { CompsterContext } from '../contexts/CompsterContext'
import { createStyles, makeStyles, Paper } from '@material-ui/core'
import { TeamControls } from '../helpers/helpers'

function getIDFromURL(url: string) {
  const re = new RegExp(/pokemon-species\/(\d+)\//)

  return re.exec(url) || [null, '?']
}

const useStyles = makeStyles(() =>
  createStyles({
    pokedexItem: {
      alignItems: 'center',
      display: 'flex',
      background: '#dddddd',
      justifyContent: 'space-between',
      marginBottom: '10px',
      padding: '0 10px 0 0'
    },
  }),
  )

const PokedexPage = () => {
  const JOHTO = 3
  const [pokedex, setPokedex] = useState({} as Pokedex)
  const {state, dispatch} = useContext(CompsterContext)
  const classes = useStyles()

  useEffect(() => {
    if( !state.pokedex ) {
      axios.get(`https://pokeapi.co/api/v2/pokedex/${JOHTO}`)
      .then(({ data }: any) => {
        setPokedex(data)
        dispatch({
          type: 'setPokedex',
          payload: {
            pokedex: data
          }
        })
      })
    } else {
      setPokedex(state.pokedex)
    }
  }, [dispatch, state])

  return (
    <>
      {pokedex.pokemon_entries && pokedex.pokemon_entries.map(({ pokemon_species }: PokemonEntry) => {
        const {url, name} = pokemon_species
        const dexID = getIDFromURL(url)[1]

        return (
          <Link
            to={`/pokemon/${dexID}`}
            style={{ textDecoration: 'none' }}
          >
            <Paper
              className={classes.pokedexItem}
              elevation={3}
              variant="outlined"
              key={dexID}
            >
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexID}.png`} alt={name} />
              <p>{name.toUpperCase()}</p>
              <TeamControls id={parseInt(dexID as string)} name={name} />
            </Paper>
          </Link>
        )
      })}
    </>
  )
}

export default PokedexPage
