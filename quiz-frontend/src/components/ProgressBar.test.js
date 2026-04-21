import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';
 
describe('ProgressBar Component', () => {
  test('renders progress text with correct percentage', () => {
    render(<ProgressBar progress={50} />);
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
  });
 
  test('sets progress fill width correctly', () => {
    const { container } = render(<ProgressBar progress={75} />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveStyle('width: 75%');
  });
 
  test('rounds decimal progress in display text', () => {
    render(<ProgressBar progress={33.7} />);
    expect(screen.getByText('34% Complete')).toBeInTheDocument();
  });
 
  test('renders with 0% progress', () => {
    const { container } = render(<ProgressBar progress={0} />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveStyle('width: 0%');
    expect(screen.getByText('0% Complete')).toBeInTheDocument();
  });
 
  test('renders with 100% progress', () => {
    const { container } = render(<ProgressBar progress={100} />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveStyle('width: 100%');
    expect(screen.getByText('100% Complete')).toBeInTheDocument();
  });
 
  test('renders progress-container element', () => {
    const { container } = render(<ProgressBar progress={50} />);
    expect(container.querySelector('.progress-container')).toBeInTheDocument();
  });
 
  test('renders progress-bar element', () => {
    const { container } = render(<ProgressBar progress={50} />);
    expect(container.querySelector('.progress-bar')).toBeInTheDocument();
  });
 
  test('renders progress-fill element', () => {
    const { container } = render(<ProgressBar progress={50} />);
    expect(container.querySelector('.progress-fill')).toBeInTheDocument();
  });
});
 
 