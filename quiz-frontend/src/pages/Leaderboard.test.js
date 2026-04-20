import { render, screen, waitFor } from '@testing-library/react';
import Leaderboard from './Leaderboard';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

test('renders leaderboard entries', async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      { userName: "Sriram", score: 8, totalQuestions: 10, timestamp: Date.now() }
    ]
  });

  render(
    <MemoryRouter>
      <Leaderboard />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText(/Sriram/)).toBeInTheDocument());
});
