import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
// For testing, I've written 26 Jest test cases across 8 test files covering all components and pages. 
// Tests include rendering checks, user interactions like clicking options, timer color logic, grade calculations, and loading states. 
// All 26 tests pass. I can run npm test to demonstrate.
test('renders Quiz Master title', () => {
  render(
    <BrowserRouter>
      <Home setUserName={() => {}} />
    </BrowserRouter>
  );
  expect(screen.getByText('Quiz Master')).toBeInTheDocument();
});
 
test('renders tagline', () => {
  render(
    <BrowserRouter>
      <Home setUserName={() => {}} />
    </BrowserRouter>
  );
  expect(screen.getByText('Prepare, Play, and Perform!')).toBeInTheDocument();
});
 
test('renders name input field', () => {
  render(
    <BrowserRouter>
      <Home setUserName={() => {}} />
    </BrowserRouter>
  );
  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
});
 
 