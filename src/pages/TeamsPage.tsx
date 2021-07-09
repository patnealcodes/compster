import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { CompsterContext } from '../contexts/CompsterContext'
import TeamContainer from '../components/Teams/TeamContainer'
import { Paper, Chip } from '@material-ui/core'
import { Link } from 'react-router-dom'

const TeamsPage = () => {
  const { state, dispatch } = useContext(CompsterContext)
  const [currentTeamName, setCurrentTeamName] = useState('')
  const [teams, setTeams] = useState([] as any[]) // todo type this

  const TEAMS_URL = `${process.env.REACT_APP_HEROKU_URL}/teams`

  function getTeamsFromAPI() {
    axios.get(TEAMS_URL)
    .then(({ data }) => {
      setTeams(data)
    })
  }

  useEffect(getTeamsFromAPI, [TEAMS_URL])

  function saveCurrentTeamToDB() {
    if( state.currentTeam.length < 6 || currentTeamName === '' ) {
      alert('Team must have a name and 6 Pokémon!')
      return
    }
    
    axios.post(`${TEAMS_URL}/create`, {
      teamName: currentTeamName,
      teamList: state.currentTeam
    })
    .then(() => {
      setCurrentTeamName('')
      dispatch({
        type: 'clearTeam'
      })
      getTeamsFromAPI()
    })
  }

  return (
    <div>
      <h1>Current Team:</h1>
      <input type="text" onChange={e=>setCurrentTeamName(e.target.value)} value={currentTeamName} />
      <button onClick={saveCurrentTeamToDB}>Save</button>
      <Paper>
        {
          state.currentTeam.length
            ? <div style={{ position: 'relative', margin: '20px 0 0' }}>
                <Chip label={currentTeamName.length ? currentTeamName : 'Please name your team above!'} color={currentTeamName.length ? 'primary' : 'secondary'} style={{ transform: 'translate(-5px, -10px)' }} />
                <TeamContainer team={state.currentTeam} />
              </div>
            : <div style={{ padding: '2px 10px' }}>
                <p>No team created!</p>
                <p>Go to the <Link to="/pokedex">Pokédex page</Link> to make one!</p>
              </div>
        }
      </Paper>

      <h1>Existing Teams</h1>
      <div>
        {
          teams.map(({ team_name, team_list }: any, i: number) => (
            <Paper key={`team${i}`} elevation={3} style={{ background: '#ddd', margin: '0 0 2em', position: 'relative' }}>
              <Chip label={team_name} color="primary" style={{ transform: 'translate(-5px, -10px)' }} />
              <TeamContainer team={team_list} />
            </Paper>
          ))
        }
      </div>
    </div>
  )
}

export default TeamsPage
