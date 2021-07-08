import React, { useContext } from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Avatar } from '@material-ui/core'

import { CompsterContext } from '../../contexts/CompsterContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(_ =>
  createStyles({
    currentTeamBar: {
      top: 'auto',
      bottom: 0,
      transition: '.2s all',
      transform: 'translateY(0)'
    },
    currentTeamBarEmpty: {
      top: 'auto',
      bottom: '0',
      transition: '.2s all',
      transform: 'translateY(100%)'
    }
  }),
)

function CurrentTeamBar() {
  const classes = useStyles();

  const { state } = useContext(CompsterContext)

  return (
    <>
      <AppBar position="fixed" className={state.currentTeam.length > 0 ? classes.currentTeamBar : classes.currentTeamBarEmpty}>
        <Toolbar style={{ justifyContent: 'space-around' }}>
          {
          (
            [null, null, null, null, null, null].map((p, i) => {
              const curr = state.currentTeam[i]
              const src = curr ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${curr}.png` : `${process.env.PUBLIC_URL}/pokeball-icon.png`
              return curr ? (
                <Link key={i} to={`/pokemon/${curr}`} style={{display: 'inline-block', maxWidth: '20%'}}>
                  <Avatar src={src} />
                </Link>
              ) : (
                <Avatar style={{maxWidth: '20%'}} key={i} src={src} />
              )
            })
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default CurrentTeamBar
