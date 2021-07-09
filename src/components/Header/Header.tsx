import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'

import logo from '../../logo.png'
import HeaderMenu from './HeaderMenu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerLogo: {
      width: '24px',
      transform: 'scale(1.25)'
    },
    linkStyle: {
      textDecoration: 'none'
    },
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
)

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Link to="/">
              <img
                alt="Pokémon Compster Logo"
                className={classes.headerLogo}
                src={logo}
              />
            </Link>
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Pokémon Compster
          </Typography>

          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
