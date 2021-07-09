import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

const TeamContainer = (props: { team: any }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      {
        [null, null, null, null, null, null].map((p, i) => {
          const curr = props.team[i]
          const src = curr ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${curr}.png` : `${process.env.PUBLIC_URL}/pokeball-icon.png`
          return curr ? (
            <Link key={i} to={`/pokemon/${curr}`} style={{display: 'inline-block', maxWidth: '20%'}}>
              <Avatar src={src} />
            </Link>
          ) : (
            <Avatar style={{maxWidth: '20%'}} key={i} src={src} />
          )
        })
      }
    </div>
  )
}

export default TeamContainer
