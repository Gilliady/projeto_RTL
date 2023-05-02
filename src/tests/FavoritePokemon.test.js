import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

test('', async () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/favorites');
  });
  screen.getByText(/no favorite pokémon found/i);
  userEvent.click(screen.getByRole('link', { name: /home/i }));
  userEvent.click(screen.getByRole('link', { name: /more details/i }));
  userEvent.click(screen.getByText(/pokémon favoritado\?/i));
  act(() => {
    history.push('/favorites');
  });
  screen.getByText(/pikachu/i);
});
