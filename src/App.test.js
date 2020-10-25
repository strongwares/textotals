import { render, screen } from '@testing-library/react';
import App from './App';

// const linkElement = screen.getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();

test('renders learn react link', () => {
  render(<App />);
});
