import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Results from './Results';

const renderResults = () =>
  render(
    <BrowserRouter>
      <Results
        userName="Sriram"
        quizScore={8}
        totalQuestions={10}
      />
    </BrowserRouter>
  );

describe('Results Page', () => {
  test('renders quiz results correctly', () => {
    renderResults();

    expect(screen.getByText(/Quiz Complete!/i)).toBeInTheDocument();
    expect(screen.getByText('Sriram')).toBeInTheDocument();

    expect(screen.getByText(/8\s*\/\s*10/)).toBeInTheDocument();

    // ✅ Split text-safe match
    expect(
      screen.getByText((_, element) =>
        element.textContent.trim() === '80%'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText(/Correct Answers/i)).toBeInTheDocument();
    expect(screen.getByText(/Incorrect Answers/i)).toBeInTheDocument();
    expect(screen.getByText(/Accuracy/i)).toBeInTheDocument();
  });

  test('shows performance message', () => {
    renderResults();

    expect(
      screen.getByText(/Great job/i)
    ).toBeInTheDocument();
  });

  test('renders action buttons', () => {
    renderResults();

    expect(
      screen.getByText(/View Leaderboard/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Back to Home/i)
    ).toBeInTheDocument();
  });
});
