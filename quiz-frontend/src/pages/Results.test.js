import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Results from './Results';
 
test('renders quiz complete heading', () => {
  render(
    <BrowserRouter>
      <Results userName="John" score={7} totalQuestions={10} />
    </BrowserRouter>
  );
  expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
});
 
test('displays the user name', () => {
  render(
    <BrowserRouter>
      <Results userName="John" score={7} totalQuestions={10} />
    </BrowserRouter>
  );
  expect(screen.getByText('John')).toBeInTheDocument();
});
 
test('displays score correctly', () => {
  render(
    <BrowserRouter>
      <Results userName="John" score={8} totalQuestions={10} />
    </BrowserRouter>
  );
  expect(screen.getByText('8 / 10')).toBeInTheDocument();
});
 
test('shows excellent message for 90%+', () => {
  render(
    <BrowserRouter>
      <Results userName="John" score={9} totalQuestions={10} />
    </BrowserRouter>
  );
  expect(screen.getByText(/Excellent/)).toBeInTheDocument();
});
 
test('shows keep practicing for below 70%', () => {
  render(
    <BrowserRouter>
      <Results userName="John" score={5} totalQuestions={10} />
    </BrowserRouter>
  );
  expect(screen.getByText(/Keep practicing/)).toBeInTheDocument();
});
 
 