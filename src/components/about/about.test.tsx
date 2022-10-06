import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './about';

describe('AboutPage', () => {
  it('renders About component', () => {
    render(<AboutPage />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
