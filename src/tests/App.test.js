import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando o funcionamento do App.js, rotas: Home, About, Favorites e NotFound', () => {
  const { history } = renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
  userEvent.click(home);
  expect(history.location.pathname).toBe('/');
  userEvent.click(about);
  expect(history.location.pathname).toBe('/about');
  userEvent.click(favorite);
  expect(history.location.pathname).toBe('/favorites');
  act(() => {
    history.push('/teste/notFound');
  });
  screen.getByRole('heading', { name: /page requested not found/i });
});
