import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Forms from './forms';
import { Genre } from '../../interfaces';
import userEvent from '@testing-library/user-event/dist';
import { act } from 'react-dom/test-utils';

describe('Forms', () => {
  const originalError = console.error.bind(console.error);
  beforeAll(() => {
    console.error = (msg) => !msg.toString().includes('act') && originalError(msg);
  });
  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    render(<Forms />);
  });

  it('renders Forms component and submit botton disabled', () => {
    expect(screen.queryByText('Add new movie:')).toBeInTheDocument();
    expect(screen.queryByRole('button')!).toBeDisabled();
  });
  it('submit button enables after users typing', () => {
    userEvent.type(screen.queryByTestId('form-title')!, 'xxx');
    expect(screen.queryByRole('button')!).toBeEnabled();
  });

  it('upload logo', async () => {
    const file = new File([new ArrayBuffer(1)], 'image.jpg', { type: 'image/png' });
    const inputFile = (await screen.findByTestId('form-upload')) as HTMLInputElement;
    expect(screen.getByTestId('form-submit-btn')).toBeDisabled();
    await act(() => {
      userEvent.upload(inputFile, file);
    });
    expect(inputFile.files!).toHaveLength(1);
  });

  it('form fields - scenario 1', async () => {
    const btn = screen.getByTestId('form-submit-btn');
    expect(btn).toBeDisabled();
    const title = screen.queryByTestId('form-title')!;
    const overview = screen.queryByTestId('form-overview')!;
    const country = screen.queryByTestId('form-country')!;
    userEvent.type(title, 'Just too much symbols in title!');
    userEvent.type(
      overview,
      'Just too much symbols in overview - ' +
        'too much symbols in overview too much symbols in overview too much symbols in overview !'
    );
    userEvent.type(country, 'Non-existing country with very long title');
    userEvent.click(btn);
    expect((await screen.findAllByText(/must/i))[0].textContent).toEqual(
      'Must be less than 30 symbols'
    );
    expect((await screen.findAllByText(/must/i))[1].textContent).toEqual(
      'Must be less than 100 symbols'
    );
    expect(screen.queryAllByText(/must/i)[2].textContent).toEqual('Must be less than 20 symbols');
  });

  it('form fields - scenario 2', async () => {
    const title = screen.queryByTestId('form-title');
    const btn = screen.getByTestId('form-submit-btn');
    const labelIsConfirmPolitics = await screen.findByLabelText('This movie is censored');
    userEvent.type(title!, 'x');
    userEvent.click(btn);
    expect(await screen.findAllByText(/must/i)).toHaveLength(7);
    await act(() => {
      userEvent.click(labelIsConfirmPolitics);
    });
    expect(labelIsConfirmPolitics).toBeChecked();
    expect(await screen.findAllByText(/must/i)).toHaveLength(6);
    expect(await screen.findByText('Genre is not valid')).toBeInTheDocument();
  });
});
