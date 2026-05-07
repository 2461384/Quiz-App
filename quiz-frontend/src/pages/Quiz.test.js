import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Quiz from './Quiz';
 
test('shows loading state initially', () => {
  render(
    <BrowserRouter>
      <Quiz userName="John" setQuizScore={() => {}} setTotalQuestions={() => {}} />
    </BrowserRouter>
  );
  expect(screen.getByText('Loading questions...')).toBeInTheDocument();
});
 