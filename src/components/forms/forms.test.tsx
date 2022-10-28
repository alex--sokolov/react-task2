import React from 'react';
import { render, screen } from '@testing-library/react';
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
    const file = new File([new ArrayBuffer(1)], 'file.jpg', { type: 'image/png' });
    const inputFile = screen.getByTestId('form-upload') as HTMLInputElement;
    const btn = screen.getByTestId('form-submit-btn');
    expect(btn).toBeDisabled();
    userEvent.upload(inputFile, file);
    expect(inputFile.files!).toHaveLength(1);
    expect(btn).toBeEnabled();
    expect(screen.queryAllByText(/must/i)).toHaveLength(0);
  });

  it('form fields - scenario 1', () => {
    const btn = screen.getByTestId('form-submit-btn');
    expect(btn).toBeDisabled();
    const title = screen.queryByTestId('form-title')!;
    const overview = screen.queryByTestId('form-overview')!;
    const country = screen.queryByTestId('form-country')!;
    userEvent.type(title, 'Just too much symbols in title!');
    userEvent.click(btn);
    expect(screen.queryAllByText(/must/i)[0].textContent).toEqual('Must be less than 30 symbols');
    userEvent.type(
      overview,
      'Just too much symbols in overview - ' +
        'too much symbols in overview too much symbols in overview too much symbols in overview !'
    );
    expect(screen.queryAllByText(/must/i)[1].textContent).toEqual('Must be less than 100 symbols');
    userEvent.type(country, 'Non-existing country with very long title');
    expect(screen.queryAllByText(/must/i)[2].textContent).toEqual('Must be less than 20 symbols');
  });

  it('form fields - scenario 2', async () => {
    const title = screen.queryByTestId('form-title');
    const overview = screen.queryByTestId('form-overview');
    const country = screen.queryByTestId('form-country');
    const date = screen.queryByTestId('form-date');
    const btn = screen.getByTestId('form-submit-btn');
    const labelIsConfirmPolitics = screen.getByLabelText('This movie is censored');
    const genre = screen.queryByRole('combobox');
    const fileGood = new File([new ArrayBuffer(1)], 'file.jpg', { type: 'image/png' });
    const fileBad = new File([new ArrayBuffer(0)], 'file.txt', { type: 'text/plain' });

    const inputFile = screen.queryByTestId('form-upload');
    userEvent.type(title!, 'x');
    userEvent.click(btn);
    expect(screen.queryAllByText(/must/i)).toHaveLength(7);
    userEvent.click(labelIsConfirmPolitics);
    expect(labelIsConfirmPolitics).toBeChecked();
    expect(screen.queryAllByText(/must/i)).toHaveLength(6);
    expect(screen.queryByText('Genre is not valid')).toBeInTheDocument();
    userEvent.selectOptions(genre!, Genre.horror);
    expect(screen.queryByText('Genre is not valid')).toBeNull();
    userEvent.type(title!, '{backspace}Cruella');
    expect(screen.queryAllByText(/must/i)).toHaveLength(5);
    userEvent.type(overview!, 'Hello Cruel World');
    expect(screen.queryAllByText(/must/i)).toHaveLength(4);
    userEvent.type(country!, 'Белурусь');
    expect(screen.queryAllByText(/must/i)).toHaveLength(3);
    userEvent.clear(country!);
    userEvent.type(country!, 'USA');
    expect(screen.queryAllByText(/must/i)).toHaveLength(2);
    userEvent.click(date!);
    userEvent.type(date!, '2022-10-12');
    expect(screen.queryAllByText(/must/i)).toHaveLength(1);
    expect(screen.queryByText('Movie was added')).toHaveClass('notify');

    act(() => {
      userEvent.click(screen.queryByText('Pick file')!);
      userEvent.upload(inputFile!, fileBad);
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(screen.queryAllByText(/must/i)).toHaveLength(1);
    expect(screen.queryByText('Must be an image')).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.queryByText('Pick file')!);
      userEvent.upload(inputFile!, fileGood);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.queryAllByText(/must/i)).toHaveLength(0);
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    expect(screen.queryByText('Movie was added')).toHaveClass('show');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(screen.queryByText('Movie was added')!.classList.contains('show')).toBeFalsy();
  });
});
