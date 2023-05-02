import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

test('', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/teste/notFound');
  });
  screen.getByRole('heading', { name: /page requested not found/i });
  const img = screen.getByRole('img', { name: /pikachu crying/i });
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
