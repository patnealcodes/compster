import React, { useContext } from 'react'
import { CompsterContext } from '../contexts/CompsterContext'

const TeamsPage = () => {
  const { state } = useContext(CompsterContext)

  return (
    <div>
      Teams: {JSON.stringify(state.currentTeam)}
    </div>
  )
}

export default TeamsPage
