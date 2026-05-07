import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';
 
test('renders progress percentage text', () => {
  render(<ProgressBar progress={50} />);
  expect(screen.getByText('50% Complete')).toBeInTheDocument();
});
 
test('renders 0% progress', () => {
  render(<ProgressBar progress={0} />);
  expect(screen.getByText('0% Complete')).toBeInTheDocument();
});
 
test('renders 100% progress', () => {
  render(<ProgressBar progress={100} />);
  expect(screen.getByText('100% Complete')).toBeInTheDocument();
});
 
test('rounds decimal progress values', () => {
  render(<ProgressBar progress={33.333} />);
  expect(screen.getByText('33% Complete')).toBeInTheDocument();
});
 