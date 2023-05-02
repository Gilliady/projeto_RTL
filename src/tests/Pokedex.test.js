import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    screen.getByRole('heading', { name: /encountered pokémon/i });
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    screen.getByText(/pikachu/i);
    pokemonList.forEach((pokemon) => {
      screen.getByText(pokemon.name);
      userEvent.click(nextPokemon);
      const pokemons = screen.getAllByRole('link', { name: /more details/i });
      expect(pokemons).toHaveLength(1);
    });
    screen.getByText(/pikachu/i);
  });

  it('Teste se é mostrado apenas os Pokémons de determinado tipo ao clicar no botão', () => {
    const fireFilter = screen.getAllByTestId('pokemon-type-button')[1];
    expect(fireFilter.textContent).toBe('Fire');
    userEvent.click(fireFilter);

    screen.getByText(/charmander/i);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    screen.getByText(/rapidash/i);
  });

  it('Teste se a Pokedéx zera os filtros ao clicar em All', () => {
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    screen.getByText(/charmander/i);
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    screen.getByText(/pikachu/i);
  });
});
