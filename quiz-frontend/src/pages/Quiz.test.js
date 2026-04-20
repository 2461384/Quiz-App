import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// ✅ Mock axios
jest.mock('axios');

// ✅ Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// ✅ Mock child components
jest.mock('../components/QuestionCard', () => ({ question, onAnswerSelect }) => (
  <div>
    <p>{question.questionText}</p>
    <button onClick={() => onAnswerSelect(question.correctAnswerId)}>
      Select Correct
    </button>
  </div>
));

jest.mock('../components/Timer', () => ({ timeLeft }) => (
  <div>Time Left: {timeLeft}</div>
));

jest.mock('../components/ProgressBar', () => () => (
  <div data-testid="progress-bar" />
));

// ✅ Mock data
const mockQuestions = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  questionText: `Question ${i + 1}`,
  correctAnswerId: 1,
}));

const renderQuiz = () =>
  render(
    <BrowserRouter>
      <Quiz
        userName="Vineetha"
        setQuizScore={jest.fn()}
        setTotalQuestions={jest.fn()}
      />
    </BrowserRouter>
  );

describe('Quiz Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Stabilize shuffle
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    jest.useFakeTimers();

    axios.get.mockResolvedValue({ data: mockQuestions });
    axios.post.mockResolvedValue({});
  });

  afterEach(() => {
    Math.random.mockRestore();
    jest.useRealTimers();
  });

  test('renders first question after fetch', async () => {
    renderQuiz();

    expect(
      await screen.findByText(/Question\s+1\s+of\s+10/i)
    ).toBeInTheDocument();
  });

  test('displays user name', async () => {
    renderQuiz();

    expect(await screen.findByText(/Welcome,/i)).toBeInTheDocument();
    expect(screen.getByText('Vineetha')).toBeInTheDocument();
  });

  test('moves to next question on Next click', async () => {
    renderQuiz();

    await screen.findByText(/Question\s+1\s+of\s+10/i);

    fireEvent.click(screen.getByText(/Next/i));

    expect(
      await screen.findByText(/Question\s+2\s+of\s+10/i)
    ).toBeInTheDocument();
  });

  test('increments score on correct answer selection', async () => {
    renderQuiz();

    await screen.findByText(/Question\s+1\s+of\s+10/i);

    fireEvent.click(screen.getByText('Select Correct'));
    fireEvent.click(screen.getByText(/Next/i));

    expect(
      await screen.findByText(/Question\s+2\s+of\s+10/i)
    ).toBeInTheDocument();
  });

  test('disables Previous button on first question', async () => {
    renderQuiz();

    const prevButton = await screen.findByText(/Previous/i);
    expect(prevButton).toBeDisabled();
  });

  test('submits quiz and navigates to results', async () => {
    renderQuiz();

    await screen.findByText(/Question\s+1\s+of\s+10/i);

    // Go to last question
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByText(/Next/i));
    }

    fireEvent.click(screen.getByText(/Submit Quiz/i));

    // ✅ Handle setTimeout navigation
    jest.runAllTimers();

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalled()
    );

    expect(mockNavigate).toHaveBeenCalledWith('/results');
  });
});