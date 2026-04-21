import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import axios from 'axios';
 
jest.mock('axios');
 
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
const mockLeaderboardData = [
  { userName: 'Alice', score: 9, totalQuestions: 10, timestamp: '2024-01-01T10:00:00Z' },
  { userName: 'Bob', score: 8, totalQuestions: 10, timestamp: '2024-01-02T10:00:00Z' },
  { userName: 'Charlie', score: 7, totalQuestions: 10, timestamp: '2024-01-03T10:00:00Z' },
  { userName: 'Dave', score: 6, totalQuestions: 10, timestamp: '2024-01-04T10:00:00Z' },
];
 
const renderLeaderboard = () =>
  render(
    <MemoryRouter>
      <Leaderboard />
    </MemoryRouter>
  );
 
describe('Leaderboard Page', () => {
  beforeEach(() => jest.clearAllMocks());
 
  test('shows loading state initially', () => {
    axios.get.mockReturnValue(new Promise(() => {})); // never resolves
    renderLeaderboard();
    expect(screen.getByText('Loading leaderboard...')).toBeInTheDocument();
  });
 
  test('renders leaderboard title', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('🏆 Leaderboard')).toBeInTheDocument();
    });
  });
 
  test('renders all leaderboard entries', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getByText('Dave')).toBeInTheDocument();
    });
  });
 
  test('shows no data message when leaderboard is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('No scores yet. Be the first to take the quiz!')).toBeInTheDocument();
    });
  });
 
  test('renders gold medal emoji for first place', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('🥇')).toBeInTheDocument();
    });
  });
 
  test('renders silver medal emoji for second place', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('🥈')).toBeInTheDocument();
    });
  });
 
  test('renders bronze medal emoji for third place', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('🥉')).toBeInTheDocument();
    });
  });
 
  test('renders correct score fractions', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('9/10')).toBeInTheDocument();
      expect(screen.getByText('8/10')).toBeInTheDocument();
    });
  });
 
  test('renders percentage values', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('90%')).toBeInTheDocument();
      expect(screen.getByText('80%')).toBeInTheDocument();
    });
  });
 
  test('renders Back to Home button', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
    });
  });
 
  test('navigates to home when Back to Home button is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderLeaderboard();
    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /back to home/i });
      fireEvent.click(btn);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
 
  test('renders table headers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockLeaderboardData });
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('Rank')).toBeInTheDocument();
      expect(screen.getByText('User Name')).toBeInTheDocument();
      expect(screen.getByText('Score')).toBeInTheDocument();
      expect(screen.getByText('Percentage')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
    });
  });
 
  test('handles fetch error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    renderLeaderboard();
    await waitFor(() => {
      expect(screen.getByText('No scores yet. Be the first to take the quiz!')).toBeInTheDocument();
    });
  });
});
 
 