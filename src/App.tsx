import { usePokemons } from './hooks';

const App = () => {
  const { pending, error, pokemons } = usePokemons(0, 10);

  console.log(pending ? 'Loading' : 'Not loading');

  console.log(error ? error : 'No error');

  console.log(pokemons);

  return (
    <div>
      <h1>Pockedex</h1>
    </div>
  );
};

export default App;
