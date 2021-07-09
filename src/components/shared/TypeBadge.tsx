import { Type } from '../../types/PokeAPI'
import { TYPE_COLOR_MAP } from '../../helpers/helpers'

interface TypeBadgeProps {
  type: Type
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
