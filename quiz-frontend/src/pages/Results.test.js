import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';
 
// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));
 
// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
const renderResults = (props = {}) => {
  const defaultProps = {
    userName: 'Alice',
    score: 8,
    totalQuestions: 10,
    ...props,
  };
  return render(
    <MemoryRouter>
      <Results {...defaultProps} />
    </MemoryRouter>
  );
};
 
describe('Results Page', () => {
  beforeEach(() => jest.clearAllMocks());
 
  test('renders Quiz Complete heading', () => {
    renderResults();
    expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
  });
 
  test('renders user name in congratulations message', () => {
    renderResults();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
 
  test('renders correct score out of total', () => {
    renderResults();
    expect(screen.getByText('8 / 10')).toBeInTheDocument();
  });
 
  test('renders correct percentage', () => {
    renderResults();
    expect(screen.getAllByText('80%').length).toBeGreaterThan(0);
  });
 
  test('renders grade A for >= 90%', () => {
    renderResults({ score: 9, totalQuestions: 10 });
    expect(screen.getByText('A')).toBeInTheDocument();
  });
 
  test('renders grade B for >= 80%', () => {
    renderResults({ score: 8, totalQuestions: 10 });
    expect(screen.getByText('B')).toBeInTheDocument();
  });
 
  test('renders grade C for >= 70%', () => {
    renderResults({ score: 7, totalQuestions: 10 });
    expect(screen.getByText('C')).toBeInTheDocument();
  });
 
  test('renders grade D for >= 60%', () => {
    renderResults({ score: 6, totalQuestions: 10 });
    expect(screen.getByText('D')).toBeInTheDocument();
  });
 
  test('renders grade F for < 60%', () => {
    renderResults({ score: 4, totalQuestions: 10 });
    expect(screen.getByText('F')).toBeInTheDocument();
  });
 
  test('renders correct answers count', () => {
    renderResults({ score: 8, totalQuestions: 10 });
    expect(screen.getByText('Correct Answers')).toBeInTheDocument();
  });
 
  test('renders incorrect answers count', () => {
    renderResults({ score: 8, totalQuestions: 10 });
    expect(screen.getByText('Incorrect Answers')).toBeInTheDocument();
  });
 
  test('renders accuracy label', () => {
    renderResults();
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
  });
 
  test('renders 0% when totalQuestions is 0', () => {
    renderResults({ score: 0, totalQuestions: 0 });
    expect(screen.getAllByText('0%').length).toBeGreaterThan(0);
  });
 
  test('renders with perfect score', () => {
    renderResults({ score: 10, totalQuestions: 10 });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('10 / 10')).toBeInTheDocument();
  });
});
 
 