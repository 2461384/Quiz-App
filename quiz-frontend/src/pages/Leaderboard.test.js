import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Leaderboard from './Leaderboard';
 
test('renders leaderboard heading', () => {
  render(
    <BrowserRouter>
      <Leaderboard />
    </BrowserRouter>
  );
  expect(screen.getByText(/Leaderboard/)).toBeInTheDocument();
});
 
test('shows loading state initially', () => {
  render(
    <BrowserRouter>
      <Leaderboard />
    </BrowserRouter>
  );
  expect(screen.getByText('Loading leaderboard...')).toBeInTheDocument();
});
 