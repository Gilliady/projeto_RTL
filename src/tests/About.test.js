import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../pages/About';

test('', () => {
  renderWithRouter(<About />);
  screen.getByRole('heading', { name: /About Pokédex/i });
  screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
  screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
  const img = screen.getByRole('img', { name: /pokédex/i });
  console.log(img.src);
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
