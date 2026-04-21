import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Quiz from './Quiz';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const questions = [
  {
    id: 1,
    questionText: 'Q1?',
    correctAnswerId: 1,
    options: [{ id: 1, optionText: 'A' }],
  },
];

test('renders quiz question', async () => {
  axios.get.mockResolvedValueOnce({ data: questions });

  render(
    <MemoryRouter>
      <Quiz userName="Test" setQuizScore={jest.fn()} setTotalQuestions={jest.fn()} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Question 1 of 1/)).toBeInTheDocument();
  });
});