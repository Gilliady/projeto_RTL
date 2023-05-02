import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pokemon/25');
  });

  screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
  expect(screen.queryByRole('link', { name: /more details/i })).not
    .toBeInTheDocument();

  screen.getByRole('heading', { name: /summary/i });
  screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

  screen.getByRole('heading', { name: /game locations of pikachu/i });

  screen.getByText(/kanto viridian forest/i);
  screen.getByText(/kanto power plant/i);
  const locationsImages = screen.getAllByRole('img', { name: /pikachu location/i });
  expect(locationsImages).toHaveLength(2);

  expect(locationsImages[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');

  expect(locationsImages[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

  userEvent.click(screen.getByText(/pokémon favoritado\?/i));
  const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
});
