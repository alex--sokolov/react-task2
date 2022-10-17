import React from 'react';
import { render, screen } from '@testing-library/react';
import Forms from './forms';
import { Adult, FormFields, Genre, IForm, MovieStatus } from '../../interfaces';
import userEvent from '@testing-library/user-event/dist';

describe('Forms', () => {

  beforeEach(() => {
    render(<Forms />);
  })

  it('renders Forms component and submit botton disabled', () => {
    expect(screen.queryByText('Add new movie:')).toBeInTheDocument();
    expect(screen.queryByRole('button')!).toBeDisabled();
  });
  it('submit button enables after users typing', () => {
    userEvent.type(screen.queryByTestId('form-input-title')!, 'C');
    expect(screen.queryByRole('button')!).toBeEnabled();
  });
  it('validate form fields', () => {
    const labelIsConfirmPolitics = screen.getByLabelText('This movie is censored');
    userEvent.click(labelIsConfirmPolitics);
    expect(labelIsConfirmPolitics).toBeChecked();
    userEvent.click(screen.queryByRole('button')!);
    expect(screen.queryAllByText(/must/i)).toHaveLength(6);
    expect(screen.queryByText('Genre is not valid')).toBeInTheDocument();
    userEvent.selectOptions(screen.queryByRole('combobox')!, Genre.horror);
    expect(screen.queryByText('Genre is not valid')).toBeNull();
    userEvent.type(screen.queryByTestId('form-input-title')!, 'Some');
    expect(screen.queryAllByText(/must/i)).toHaveLength(5);
    userEvent.type(screen.queryByTestId('form-input-title')!, ' very large naming for movie');
    expect(screen.queryAllByText(/must/i)).toHaveLength(6);
    // expect(screen.getByText(MovieStatus.waiting)).toBeInTheDocument();
    // expect(screen.getByText(Adult.true)).toBeInTheDocument();



  });
});
