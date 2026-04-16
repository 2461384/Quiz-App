import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

test('renders progress correctly', () => {
  render(<ProgressBar progress={50} />);
  expect(screen.getByText(/50% Complete/i)).toBeInTheDocument();
});
