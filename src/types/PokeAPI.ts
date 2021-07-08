export interface Pokedex {
  id: number
  name: string
  is_main_series: boolean
  descriptions: any[]
  names: any[]
  pokemon_entries: PokemonEntry[]
  region: any
  version_groups: any[]
}

export interface PokemonEntry {
  entry_number: number
  pokemon_species: any
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: any[]
  forms: any
  game_indices: any[]
  held_items: any[]
  location_area_encounters: string
  moves: any[]
  sprites: PokemonSprites
  species: any
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface PokemonSprites {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
  back_default: string
  back_shiny: string
  back_female: string
  back_shiny_female: string
  other: any
}

export interface PokemonStat {
  stat: any
  effort: number
  base_stat: number
}

export interface PokemonType {
  slot: number
  type: {
    name: Type,
    url: string
  }
}

export type Type = 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dark' | 'dragon' | 'steel' | 'fairy'
