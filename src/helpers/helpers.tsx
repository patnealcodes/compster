import { SyntheticEvent, useContext } from "react"

import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { CompsterContext } from "../contexts/CompsterContext"
import { PokemonType, Type } from "../types/PokeAPI";

export const TYPE_COLOR_MAP = {
  normal: {
    primary: '#a8a878',
    secondary: '#'
  },
  fire: {
    primary: '#f08030',
    secondary: '#'
  },
  water: {
    primary: '#6a8feb',
    secondary: '#'
  },
  grass: {
    primary: '#78c84f',
    secondary: '#'
  },
  electric: {
    primary: '#f9cf30',
    secondary: '#'
  },
  ice: {
    primary: '#98d8d8',
    secondary: '#'
  },
  fighting: {
    primary: '#c03128',
    secondary: '#'
  },
  poison: {
    primary: '#9f40a0',
    secondary: '#'
  },
  ground: {
    primary: '#e1c068',
    secondary: '#'
  },
  flying: {
    primary: '#a890f0',
    secondary: '#3b16a9'
  },
  psychic: {
    primary: '#f85888',
    secondary: '#'
  },
  bug: {
    primary: '#a7b820',
    secondary: '#535c10'
  },
  rock: {
    primary: '#b7a039',
    secondary: '#'
  },
  ghost: {
    primary: '#705998',
    secondary: '#'
  },
  dark: {
    primary: '#6f5848',
    secondary: '#'
  },
  dragon: {
    primary: '#7038f8',
    secondary: '#'
  },
  steel: {
    primary: '#b8b8d0',
    secondary: '#'
  },
  fairy: {
    primary: '#f0b6bc',
    secondary: '#'
  },
}

interface TeamControlsProps {
  id: number
  name: string
}

export function getPrimaryColorFromTypes(types: PokemonType[]): Type {
  const name = types[0].type.name
  return TYPE_COLOR_MAP[name].primary as Type
}

export const TeamControls = ({id, name}: TeamControlsProps) => {
  const { state, dispatch } = useContext(CompsterContext)

  if( state.currentTeam.find(n => n === id) ) {
    return (<>
      <Fab
        color="secondary"
        aria-label="delete"
        size="small"
        onClick={(e: SyntheticEvent) => {
          e.preventDefault()
          dispatch({
            type: 'removeFromTeam',
            payload: { id: id }
          })
        }}
      >
        <RemoveIcon />
      </Fab>
    </>)
  } else {
    return (<>
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        disabled={state.currentTeam.length >= 6}
        title={state.currentTeam.length >= 6 ? 'Team full!' : `Add ${name} to Team`}
        onClick={(e: SyntheticEvent) => {
          e.preventDefault()
          dispatch({
            type: 'addToTeam',
            payload: { id: id }
          })
        }}
      >
        <AddIcon />
      </Fab>
    </>)
  }
}
