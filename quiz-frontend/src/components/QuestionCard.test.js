import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from './QuestionCard';

const mockQuestion = {
  questionText: "What is 2+2?",
  options: [
    { id: "1", optionText: "3" },
    { id: "2", optionText: "4" }
  ]
};

test('selects an answer', () => {
  const handleSelect = jest.fn();
  render(<QuestionCard question={mockQuestion} onAnswerSelect={handleSelect} selectedAnswer={null} questionNumber={1} />);
  fireEvent.click(screen.getByLabelText("4"));
  expect(handleSelect).toHaveBeenCalledWith("2");
});
