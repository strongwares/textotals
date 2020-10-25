import { render } from '@testing-library/react';
import App from './App';

// const linkElement = screen.getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();

test('renders App', () => {
  render(<App />);
});
