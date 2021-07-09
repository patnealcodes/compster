import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Pokémon Compster!</h1>
        <p>Click the menu to the top left and select 'Pokédex' (or just click <Link to="/pokedex">here</Link>) to get started!</p>
        <h2>How to use:</h2>
        <ul>
          <li>First, navigate to the <Link to="/pokedex">Pokédex Page</Link>
          </li>
          <li>
            <div>
              Next, add some Pokémon to your team! You can either add a Pokémon to your team directly from the list by clicking the '+' button...
              <img style={{ maxWidth: '100%', marginBottom: '2em' }} src={`${process.env.PUBLIC_URL}/walkthroughPics/add_from_dex.png`} alt="Next, add some Pokémon to your team! You can either add a Pokémon to your team directly from the list by clicking the '+' button" />
            </div>
          </li>
          <li>
            <div>
              ...or click anywhere else in the block to view information about that Pokémon. You can also add them from here as well!
              <img style={{ maxWidth: '100%', marginBottom: '2em' }} src={`${process.env.PUBLIC_URL}/walkthroughPics/add_from_details.png`} alt="or click anywhere else in the block to view information about that Pokémon. You can also add them from here as well" />
            </div>
          </li>
          <li>
            <div>
              Once your team has all 6 pokemon, visit the <Link to="/teams">Teams Page</Link> to give it a name, and save it!
              <img style={{ maxWidth: '100%', marginBottom: '2em' }} src={`${process.env.PUBLIC_URL}/walkthroughPics/name_your_team.png`} alt="Once your team has all 6 pokemon, visit the Teams Page to give it a name, and save it" />
            </div>
          </li>
          <li>
            <div>
              NOTE: You can also view other saved teams from this page as well!
              <img style={{ maxWidth: '100%', marginBottom: '2em' }} src={`${process.env.PUBLIC_URL}/walkthroughPics/existing_teams.png`} alt="NOTE: You can also view other saved teams from this page as well" />
            </div>
          </li>
        </ul>
      </header>
    </div>
  )
}

export default HomePage
