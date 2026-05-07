import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from './QuestionCard';
 
const mockQuestion = {
  questionText: 'What is React?',
  options: [
    { id: 1, optionText: 'A library' },
    { id: 2, optionText: 'A framework' },
    { id: 3, optionText: 'A language' },
  ],
};
 
test('renders question text', () => {
  render(<QuestionCard question={mockQuestion} onAnswerSelect={() => {}} selectedAnswer={null} questionNumber={1} />);
  expect(screen.getByText('What is React?')).toBeInTheDocument();
});
 
test('renders all options', () => {
  render(<QuestionCard question={mockQuestion} onAnswerSelect={() => {}} selectedAnswer={null} questionNumber={1} />);
  expect(screen.getByText('A library')).toBeInTheDocument();
  expect(screen.getByText('A framework')).toBeInTheDocument();
  expect(screen.getByText('A language')).toBeInTheDocument();
});
 
test('calls onAnswerSelect when an option is clicked', () => {
  const mockHandler = jest.fn();
  render(<QuestionCard question={mockQuestion} onAnswerSelect={mockHandler} selectedAnswer={null} questionNumber={1} />);
  fireEvent.click(screen.getByText('A library'));
  expect(mockHandler).toHaveBeenCalledWith(1);
});
 
test('shows checkmark for selected answer', () => {
  render(<QuestionCard question={mockQuestion} onAnswerSelect={() => {}} selectedAnswer={1} questionNumber={1} />);
  expect(screen.getByText('✓')).toBeInTheDocument();
});
 
 