import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

test('shows error when name is empty', () => {
  const setUserName = jest.fn();
  render(<MemoryRouter><Home setUserName={setUserName} /></MemoryRouter>);
  fireEvent.click(screen.getByText(/START QUIZ/i));
  expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
});
