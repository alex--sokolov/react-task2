import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

describe('App', () => {
  it('renders App component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app')).toBeInTheDocument();
    const mainLink = screen.getByTestId('main-link');
    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    userEvent.click(mainLink);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
