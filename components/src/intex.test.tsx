import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event/dist';

describe('index', () => {
  it('router test', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const mainLink = screen.getByTestId('main-link');
    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    userEvent.click(mainLink);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
//
// describe('Test index.ts', () => {
//   it('Should render app without crashing', () => {
//     expect(
//       JSON.stringify(Object.assign({}, index, { _reactInternalInstance: 'censored' }))
//     ).toMatchSnapshot();
//   });
// });
