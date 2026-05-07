import { render, screen } from '@testing-library/react';
import Timer from './Timer';
 
test('renders time left', () => {
  render(<Timer timeLeft={45} />);
  expect(screen.getByText('45s')).toBeInTheDocument();
});
 
test('shows "Hurry up!" when time is 10 or less', () => {
  render(<Timer timeLeft={10} />);
  expect(screen.getByText('Hurry up!')).toBeInTheDocument();
});
 
test('does not show "Hurry up!" when time is above 10', () => {
  render(<Timer timeLeft={30} />);
  expect(screen.queryByText('Hurry up!')).not.toBeInTheDocument();
});
 
test('applies critical class when time <= 10', () => {
  const { container } = render(<Timer timeLeft={5} />);
  expect(container.querySelector('.critical')).toBeInTheDocument();
});
 
test('applies warning class when time <= 30', () => {
  const { container } = render(<Timer timeLeft={20} />);
  expect(container.querySelector('.warning')).toBeInTheDocument();
});
 
test('applies normal class when time > 30', () => {
  const { container } = render(<Timer timeLeft={45} />);
  expect(container.querySelector('.normal')).toBeInTheDocument();
});
 
 