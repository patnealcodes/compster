import React from 'react'
import { Type } from '../../types/PokeAPI'

interface TypeBadgeProps {
  type: Type
}

const TYPE_COLOR_MAP = {
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

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const {primary, secondary} = TYPE_COLOR_MAP[type]

  const typeBadgeStyle = {
    background: primary,
    boxShadow: `inset 0 0 4px 2px ${secondary}`,
    borderRadius: '.25em',
    color: 'white',
    fontWeight: 600,
    padding: '.25em .5em'
  }

  return (
    <span style={typeBadgeStyle}>{type.toUpperCase()}</span>
  )
}

export default TypeBadge
