import { PokemonList } from './features/pokemons/components';

const App = () => {
  return (
    <div>
      <h1>Pockedex</h1>
      <PokemonList offset={0} limit={10} />
    </div>
  );
};

export default App;
