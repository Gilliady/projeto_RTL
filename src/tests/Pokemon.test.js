import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('', () => {
  const { history } = renderWithRouter(<App />);
  screen.getByText(/pikachu/i);
  const typeEletric = screen.getByTestId('pokemon-type');
  expect(typeEletric.textContent).toEqual('Electric');
  screen.getByText(/average weight: 6.0 kg/i);

  const pokemonSprite = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(pokemonSprite.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  const moreDetails = screen.getByRole('link', { name: /more details/i });

  expect(moreDetails.href).toContain('/pokemon/25');
  userEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemon/25');
  expect(screen.queryByRole('img', { name: /pikachu is marked as favorite/i }))
    .not
    .toBeInTheDocument();
  userEvent.click(screen.getByText(/pokémon favoritado\?/i));
  const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
});
