import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import TeamContainer from './TeamContainer';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CompsterContext } from '../../contexts/CompsterContext';

const useStyles = makeStyles(_ =>
  createStyles({
    currentTeamBar: {
      top: 'auto',
      bottom: 0,
      paddingBottom: '15px'
    },
    currentTeamContainer: {
      flexDirection: 'column'
    },
    currentTeamText: {
      color: 'white',
      padding: '5px 0 0',
      textDecoration: 'none'
    }
  }),
)

function CurrentTeamBar() {
  const classes = useStyles();
  const {state} = useContext(CompsterContext)

  return (
    <>
      <AppBar position="fixed" className={classes.currentTeamBar}>
        <Toolbar className={classes.currentTeamContainer}>
          <Typography
            className={classes.currentTeamText}
            component={Link}
            to='/teams'
          >
            Current Team
          </Typography>
          <TeamContainer team={state.currentTeam} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default CurrentTeamBar
