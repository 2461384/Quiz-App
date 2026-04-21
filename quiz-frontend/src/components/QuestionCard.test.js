import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from './QuestionCard';
 
const mockQuestion = {
  id: 1,
  questionText: 'What is the capital of France?',
  correctAnswerId: 2,
  options: [
    { id: 1, optionText: 'Berlin' },
    { id: 2, optionText: 'Paris' },
    { id: 3, optionText: 'Madrid' },
    { id: 4, optionText: 'Rome' },
  ],
};
 
describe('QuestionCard Component', () => {
  test('renders the question text', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={null}
        questionNumber={1}
      />
    );
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });
 
  test('renders all answer options', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={null}
        questionNumber={1}
      />
    );
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
    expect(screen.getByText('Rome')).toBeInTheDocument();
  });
 
  test('calls onAnswerSelect when an option is clicked', () => {
    const mockOnAnswerSelect = jest.fn();
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={mockOnAnswerSelect}
        selectedAnswer={null}
        questionNumber={1}
      />
    );
    const parisOption = screen.getByDisplayValue('2');
    fireEvent.click(parisOption);
    expect(mockOnAnswerSelect).toHaveBeenCalledWith(2);
  });
 
  test('shows checkmark for selected answer', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={2}
        questionNumber={1}
      />
    );
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
 
  test('does not show checkmark when no answer is selected', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={null}
        questionNumber={1}
      />
    );
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });
 
  test('marks the correct radio button as checked', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={2}
        questionNumber={1}
      />
    );
    const selectedRadio = screen.getByDisplayValue('2');
    expect(selectedRadio).toBeChecked();
  });
 
  test('other options are not checked when one is selected', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={2}
        questionNumber={1}
      />
    );
    expect(screen.getByDisplayValue('1')).not.toBeChecked();
    expect(screen.getByDisplayValue('3')).not.toBeChecked();
    expect(screen.getByDisplayValue('4')).not.toBeChecked();
  });
 
  test('renders correct number of radio inputs', () => {
    const { container } = render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={null}
        questionNumber={1}
      />
    );
    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios).toHaveLength(4);
  });
 
  test('radio inputs use the correct name attribute', () => {
    const { container } = render(
      <QuestionCard
        question={mockQuestion}
        onAnswerSelect={jest.fn()}
        selectedAnswer={null}
        questionNumber={3}
      />
    );
    const radios = container.querySelectorAll('input[name="question-3"]');
    expect(radios).toHaveLength(4);
  });
});
 
 