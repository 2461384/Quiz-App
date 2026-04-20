import { render, screen } from '@testing-library/react';
import Timer from './Timer';

test('shows warning when time is low', () => {
  render(<Timer timeLeft={5} />);
  expect(screen.getByText(/Hurry up!/i)).toBeInTheDocument();
});
