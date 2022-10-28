import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MainPage from './main';
import userEvent from '@testing-library/user-event/dist';
import { act } from 'react-dom/test-utils';
import { server, rest } from '../../testServer';

describe('MainPage', () => {
  beforeEach(() => {
    jest.useRealTimers();
    // jest.useFakeTimers();
    render(<MainPage />);
  });
  afterEach(() => {
    // jest.runOnlyPendingTimers();
    // jest.useRealTimers();
  });

  it('renders MainPage component', () => {
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('searches movies with click, opens full info popup on movie click', async () => {
    const searchBtn = screen.getByTestId('label-search');
    userEvent.click(searchBtn);
    expect(
      await screen.findByText('Movie-list from "The Lord of the Rings" API')
    ).toBeInTheDocument();
    const movies = await screen.findAllByTestId(/movie-id/i);
    expect(movies.length).toBe(2);
    userEvent.click(movies[0]);
    const popups = await screen.findAllByTestId(/popup-id/i);
    expect(popups[0]).toHaveClass('show');
    const closeBtn = await screen.findAllByText('x');
    userEvent.click(closeBtn[0]);
    expect(popups[0].classList.contains('show')).toBeFalsy();
    userEvent.click(movies[0]);
    const overlay = await screen.findByTestId('overlay');
    userEvent.click(overlay);
    expect(popups[0].classList.contains('show')).toBeFalsy();
  });

  it('searches movies with pressing Enter', async () => {
    const search = screen.getByTestId('search');
    fireEvent.keyDown(search, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(
      await screen.findByText('Movie-list from "The Lord of the Rings" API')
    ).toBeInTheDocument();
    const movies = await screen.findAllByTestId(/movie-id/i);
    expect(movies.length).toBe(2);
  });

  it('shows a notification, when there is an error in http request', async () => {
    server.use(
      rest.get(process.env.REACT_APP_API_URL as string, async (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    const searchBtn = screen.getByTestId('label-search');
    userEvent.click(searchBtn);
    const notify = await screen.findByText(/404/i);
    expect(notify).toBeInTheDocument();
    expect(notify).toHaveClass('show');
    expect(notify.textContent).toBe('404 | Not Found');
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    expect(notify.classList.contains('show')).toBeFalsy();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
    });
    expect(notify.textContent).toBe('undefined | undefined');
  }, 10000);

  it('searches movies with pressing Enter', async () => {
    userEvent.type(screen.getByTestId('search'), 'x');
    fireEvent.keyDown(screen.getByTestId('search'), { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(
      await screen.findByText('Movie-list from "The Lord of the Rings" API')
    ).toBeInTheDocument();
    const movies = await screen.findAllByTestId(/movie-id/i);
    expect(movies.length).toBe(2);
  });
});
