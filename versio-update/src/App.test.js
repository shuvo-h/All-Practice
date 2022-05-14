import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {debug} = render(<App />);
  // eslint-disable-next-line testing-library/no-debugging-utils
  debug()
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
