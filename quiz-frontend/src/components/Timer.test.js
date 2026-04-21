import React from 'react';
import { render, screen } from '@testing-library/react';
import Timer from './Timer';

describe('Timer Component', () => {
  test('renders time value', () => {
    render(<Timer timeLeft={45} />);
    expect(screen.getByText('45s')).toBeInTheDocument();
  });

  test('applies normal class', () => {
    const { container } = render(<Timer timeLeft={45} />);
    expect(container.querySelector('.timer')).toHaveClass('timer', 'normal');
  });

  test('applies warning class', () => {
    const { container } = render(<Timer timeLeft={25} />);
    expect(container.querySelector('.timer')).toHaveClass('timer', 'warning');
  });

  test('applies critical class and warning text', () => {
    const { container } = render(<Timer timeLeft={8} />);
    expect(container.querySelector('.timer')).toHaveClass('timer', 'critical');
    expect(screen.getByText('Hurry up!')).toBeInTheDocument();
  });
});
