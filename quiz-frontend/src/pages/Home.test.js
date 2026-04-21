import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
 
// Mock react-router-dom navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));
 
const { toast } = require('react-toastify');
 
// Mock fetch globally
global.fetch = jest.fn();
 
describe('Home Page', () => {
  const mockSetUserName = jest.fn();
 
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  const renderHome = () =>
    render(
      <MemoryRouter>
        <Home setUserName={mockSetUserName} />
      </MemoryRouter>
    );
 
  test('renders app title', () => {
    renderHome();
    expect(screen.getByText('Quiz Master')).toBeInTheDocument();
  });
 
  test('renders tagline', () => {
    renderHome();
    expect(screen.getByText('Prepare, Play, and Perform!')).toBeInTheDocument();
  });
 
  test('renders name input field', () => {
    renderHome();
    expect(screen.getByPlaceholderText(/your name here/i)).toBeInTheDocument();
  });
 
  test('renders start button', () => {
    renderHome();
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument();
  });
 
  test('updates input value when user types', () => {
    renderHome();
    const input = screen.getByPlaceholderText(/your name here/i);
    fireEvent.change(input, { target: { value: 'John' } });
    expect(input.value).toBe('John');
  });
 
  test('shows error toast when name is empty on submit', async () => {
    renderHome();
    const button = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(button);
    expect(toast.error).toHaveBeenCalledWith('Please enter your name');
  });
 
  test('shows error toast when name is only whitespace', async () => {
    renderHome();
    const input = screen.getByPlaceholderText(/your name here/i);
    fireEvent.change(input, { target: { value: '   ' } });
    const button = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(button);
    expect(toast.error).toHaveBeenCalledWith('Please enter your name');
  });
 
  test('shows error toast when user already attempted quiz', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => true,
    });
    renderHome();
    const input = screen.getByPlaceholderText(/your name here/i);
    fireEvent.change(input, { target: { value: 'John' } });
    const button = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
 
  test('calls setUserName and navigates when fetch succeeds with no prior attempt', async () => {
    jest.useFakeTimers();
    global.fetch.mockResolvedValueOnce({
      json: async () => false,
    });
    renderHome();
    const input = screen.getByPlaceholderText(/your name here/i);
    fireEvent.change(input, { target: { value: 'Alice' } });
    const button = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
    jest.advanceTimersByTime(600);
    await waitFor(() => {
      expect(mockSetUserName).toHaveBeenCalledWith('Alice');
      expect(mockNavigate).toHaveBeenCalledWith('/quiz');
    });
    jest.useRealTimers();
  });
 
  test('navigates to quiz on fetch error (fallback behavior)', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    renderHome();
    const input = screen.getByPlaceholderText(/your name here/i);
    fireEvent.change(input, { target: { value: 'Bob' } });
    const button = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockSetUserName).toHaveBeenCalledWith('Bob');
      expect(mockNavigate).toHaveBeenCalledWith('/quiz');
    });
  });
 
  test('renders Get Ready timeline step', () => {
    renderHome();
    expect(screen.getByText('Get Ready')).toBeInTheDocument();
  });
 
  test('renders Take the Quiz timeline step', () => {
    renderHome();
    expect(screen.getByText('Take the Quiz')).toBeInTheDocument();
  });
 
  test('renders Check Answers timeline step', () => {
    renderHome();
    expect(screen.getByText('Check Answers')).toBeInTheDocument();
  });
});