import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('renders Header component', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(await screen.findByText(/about/i)).toBeInTheDocument();
    expect(await screen.findByText(/main/i)).toBeInTheDocument();
  });

  it('Header link Main works', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const btnMain = screen.getByTestId('main-link');
    expect(btnMain.getAttribute('href')).toBe('/main');
  });
});
