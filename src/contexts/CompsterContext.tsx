import { createContext, Dispatch, useReducer } from 'react'
import { Pokedex, Pokemon } from '../types/PokeAPI'

interface CachedPokemon {
  [key: string]: Pokemon
}

interface CompsterContextState {
  currentTeam: number[]
  pokedex?: Pokedex
  cachedPokemon: CachedPokemon
}

interface CompsterContextAction {
  type: 'addToTeam' | 'removeFromTeam' | 'clearTeam' | 'setPokedex' | 'cachePokemon'
  payload?: {
    id?: number
    pokedex?: Pokedex,
    pokemon?: Pokemon
  }
}

interface CompsterProviderProps {
  children: JSX.Element
}

interface CompsterProviderState {
  state: CompsterContextState
  dispatch: Dispatch<CompsterContextAction>
}


const reducer = (state: CompsterContextState, { type, payload }: CompsterContextAction) => {
  let currentTeam = [...state.currentTeam]
  switch(type) {
    case 'addToTeam':
      if( payload && payload.id ) currentTeam.push(payload.id)
      return { ...state, currentTeam }
    case 'removeFromTeam':
      currentTeam = currentTeam.filter(id => id !== (payload||{}).id)
      return { ...state, currentTeam }
    case 'clearTeam':
      return { ...state, currentTeam: []}
    case 'setPokedex':
      const pokedex = (payload||{}).pokedex
      return { ...state, pokedex }
    case 'cachePokemon':
      const cachedPokemon = state.cachedPokemon
      if( payload && payload.pokemon && !cachedPokemon[payload.pokemon.id] ) {
        cachedPokemon[payload.pokemon.id] = payload.pokemon
      }
      return {...state, cachedPokemon}
    default:
      return {...state}
  }
}

const initialState: CompsterContextState = {
  currentTeam: [],
  cachedPokemon: {}
}

const CompsterContext = createContext<CompsterProviderState>(undefined as any)

function CompsterProvider(props: CompsterProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CompsterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CompsterContext.Provider>
  )
}

export { CompsterContext, CompsterProvider }
