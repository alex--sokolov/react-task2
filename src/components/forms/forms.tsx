import React, { Component, FormEvent, ReactNode } from 'react';
import './forms.scss';
import {
  FieldError,
  FormFields,
  Genre,
  IDateTypeField,
  IForm,
  IStateForms,
  NotifyType,
  NotifyMessage,
} from '../../interfaces';
import FormsCards from 'components/forms-cards/forms-cards';
import {
  isValidDate,
  isValidGenre,
  isValidMax,
  isValidMin,
  isValidOnlyEnglishSymbols,
} from '../../utils/validate';
import Spinner from 'components/spinner/spinner';
import { readFileAsDataURL } from '../../utils/readFileAsDataUrl';
import Notify from '../notify/notify';

class Forms extends Component {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeDateType = this.changeDateType.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  minDate = '1997-01-01';
  maxDate = '2030-12-31';
  initialForm: IForm = {
    id: 1,
    title: '',
    overview: '',
    country: '',
    releaseDate: '',
    genre: Genre.default,
    isConfirmPolitics: false,
    adult: false,
    logo: undefined,
  };
  state: IStateForms = {
    form: this.initialForm,
    cards: [],
    dateType: 'text',
    isFormChecked: false,
    errors: [],
    isLoading: false,
    submitted: false,
    added: false,
  };
  fileInput: HTMLInputElement | null = null;

  handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    if (!this.state.isFormChecked) {
      this.setState(() => ({ isFormChecked: true }));
    }
    const target = event.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    let errors: FieldError[] = [];
    if (this.state.submitted) {
      errors = [...this.state.errors].filter((error: FieldError) => error.field !== name);
      switch (name) {
        case FormFields.title:
          errors = [...errors, ...this.validateTitle(value as string)];
          break;
        case FormFields.overview:
          errors = [...errors, ...this.validateOverview(value as string)];
          break;
        case FormFields.country:
          errors = [...errors, ...this.validateCountry(value as string)];
          break;
        case FormFields.releaseDate:
          errors = [...errors, ...this.validateDate(value as string)];
          break;
        case FormFields.genre:
          errors = [...errors, ...this.validateGenre(value as Genre)];
          break;
        case FormFields.isConfirmPolitics:
          errors = [...errors, ...this.validateIsConfirmPolitics(value as boolean)];
          break;
      }
    }
    this.setState((prevState: IStateForms) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
      errors,
    }));
  }

  async handleChangeImage(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!this.state.isFormChecked) {
      this.setState(() => ({ isFormChecked: true }));
    }
    this.setState(() => ({
      isLoading: true,
    }));
    const files = event.target.files as FileList;
    const imageFile = files[0] as Blob;
    const errors = [...this.state.errors].filter((error: FieldError) => error.field !== 'logo');
    const logo = await readFileAsDataURL(imageFile);
    if (logo && typeof logo === 'object') {
      errors.push(logo as FieldError);
    }
    this.setState((prevState: IStateForms) => ({
      form: {
        ...prevState.form,
        logo,
      },
      isLoading: false,
      errors,
    }));
  }

  changeDateType(fieldType: IDateTypeField) {
    const dateType = fieldType;
    this.setState({ dateType });
  }

  validateTitle(value?: string): FieldError[] {
    const result = [];
    const errors = [];
    const title = value || this.state.form.title;
    const minLength = 3;
    const maxLength = 30;
    if (!isValidMin(title, minLength)) {
      errors.push(`Must be more than ${minLength} symbols`);
    }
    if (!isValidMax(title, maxLength)) {
      errors.push(`Must be less than ${maxLength} symbols`);
    }

    if (errors.length) {
      result.push({
        field: FormFields.title,
        errors,
      });
    }
    return result;
  }

  validateOverview(value?: string): FieldError[] {
    const result = [];
    const errors = [];
    const overview = value || this.state.form.overview;
    const minLength = 3;
    const maxLength = 100;
    if (!isValidMin(overview, minLength)) {
      errors.push(`Must be more than ${minLength} symbols`);
    }
    if (!isValidMax(overview, maxLength)) {
      errors.push(`Must be less than ${maxLength} symbols`);
    }

    if (errors.length) {
      result.push({
        field: FormFields.overview,
        errors,
      });
    }
    return result;
  }

  validateCountry(value?: string): FieldError[] {
    const result = [];
    const errors = [];
    const country = value || this.state.form.country;
    const minLength = 3;
    const maxLength = 20;
    if (!isValidMin(country, minLength)) {
      errors.push(`Must be more than ${minLength} symbols`);
    }
    if (!isValidMax(country, maxLength)) {
      errors.push(`Must be less than ${maxLength} symbols`);
    }
    if (!isValidOnlyEnglishSymbols(country)) {
      errors.push(`Must contain only english symbols`);
    }

    if (errors.length) {
      result.push({
        field: FormFields.country,
        errors,
      });
    }
    return result;
  }

  validateDate(value?: string): FieldError[] {
    const result = [];
    const errors = [];
    const releaseDate = value || this.state.form.releaseDate;
    if (!isValidDate(releaseDate, this.minDate, this.maxDate)) {
      errors.push(`Must be between ${this.minDate} and ${this.maxDate} date`);
    }

    if (errors.length) {
      result.push({
        field: FormFields.releaseDate,
        errors,
      });
    }
    return result;
  }

  validateGenre(value?: Genre): FieldError[] {
    const result = [];
    const errors = [];
    const genre = value || this.state.form.genre;
    if (!isValidGenre(genre)) {
      errors.push(`Genre is not valid`);
    }

    if (errors.length) {
      result.push({
        field: 'genre',
        errors,
      });
    }
    return result;
  }

  validateIsConfirmPolitics(value?: boolean): FieldError[] {
    const result = [];
    const isConfirmPolitics = value !== undefined ? value : this.state.form.isConfirmPolitics;
    if (!isConfirmPolitics) {
      result.push({
        field: FormFields.isConfirmPolitics,
        errors: ['Movie must be censored!'],
      });
    }
    return result;
  }

  validateLogo(): FieldError[] {
    const result = [];
    if (!this.state.form.logo) {
      const errors = ['Logo must be specified'];
        // this.state.form.logo === null ? ['Uploaded incorrectly'] : ['Logo must be specified'];
      result.push({
        field: FormFields.logo,
        errors,
      });
    }
    return result;
  }

  validateForm(): FieldError[] {
    return [
      ...this.validateTitle(),
      ...this.validateOverview(),
      ...this.validateCountry(),
      ...this.validateDate(),
      ...this.validateGenre(),
      ...this.validateIsConfirmPolitics(),
      ...this.validateLogo(),
    ];
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState(() => ({
      isLoading: true,
    }));

    const errors = this.validateForm();
    if (!errors.length) {
      this.saveForm();
    } else {
      this.setState(() => ({
        errors,
        submitted: true,
        isLoading: false,
      }));
    }
  }

  saveForm() {
    this.setState((prevState: IStateForms) => {
      const cards = [...prevState.cards];
      const form = { ...prevState.form };
      cards.push(form);
      return {
        form: { ...this.initialForm, id: prevState.form.id + 1 },
        cards,
        dateType: 'text',
        isFormChecked: false,
        errors: [],
        isLoading: false,
        submitted: false,
        added: true,
      };
    });
    setTimeout(() => {
      this.setState(() => ({ added: false }));
    }, 2000);
  }

  getFieldsErrors(field: string): string[] | undefined {
    return (
      this.state.errors.filter((error: FieldError) => error.field === field)[0]?.errors || undefined
    );
  }

  render(): React.ReactNode {
    const errorsTitle = this.getFieldsErrors(FormFields.title);
    const errorsOverview = this.getFieldsErrors(FormFields.overview);
    const errorsCountry = this.getFieldsErrors(FormFields.country);
    const errorsReleaseDate = this.getFieldsErrors(FormFields.releaseDate);
    const errorsGenre = this.getFieldsErrors(FormFields.genre);
    const errorsIsConfirmPolitics = this.getFieldsErrors(FormFields.isConfirmPolitics);
    const errorsLogo = this.getFieldsErrors(FormFields.logo);
    const showErrors = (errors: string[] | undefined): ReactNode =>
      errors ? errors.map((error: string, index: number) => <div key={index}>{error}</div>) : '';
    return (
      <section className="forms">
        <Notify
          isShow={this.state.added}
          message={NotifyMessage.MOVIE_ADDED}
          type={NotifyType.OK}
        />
        <form
          id="form-add-movie"
          className="form-add-movie"
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <h1>Add new movie:</h1>
          <div className="field-errors">{showErrors(errorsTitle)}</div>
          <div className="form__field-row">
            <label>Title:</label>
            <input
              type="text"
              name={FormFields.title}
              className={errorsTitle ? 'error' : ''}
              value={this.state.form.title}
              onChange={this.handleInputChange}
              data-testid="form-title"
            />
          </div>
          <div className="field-errors">{showErrors(errorsOverview)}</div>
          <div className="form__field-row">
            <label>Overview:</label>
            <textarea
              name={FormFields.overview}
              className={errorsOverview ? 'error' : ''}
              value={this.state.form.overview}
              onChange={this.handleInputChange}
              data-testid="form-overview"
            />
          </div>
          <div className="field-errors">{showErrors(errorsCountry)}</div>
          <div className="form__field-row">
            <label>Country:</label>
            <input
              type="text"
              className={errorsCountry ? 'error' : ''}
              name={FormFields.country}
              value={this.state.form.country}
              onChange={this.handleInputChange}
              data-testid="form-country"
            />
          </div>
          <div className="field-errors">{showErrors(errorsReleaseDate)}</div>
          <div className="form__field-row">
            <label>Release date:</label>
            <input
              type={this.state.dateType}
              className={
                this.state.dateType === 'text' ? 'text' : 'date' && errorsReleaseDate ? 'error' : ''
              }
              placeholder="MM/DD/YYYY"
              onFocus={() => this.changeDateType('date')}
              onBlur={() => this.changeDateType('text')}
              min={this.minDate}
              max={this.maxDate}
              name={FormFields.releaseDate}
              value={this.state.form.releaseDate}
              onChange={this.handleInputChange}
              data-testid="form-date"
            />
          </div>
          <div className="field-errors">{showErrors(errorsGenre)}</div>
          <div className="form__field-row">
            <label>Genre:</label>
            <select
              name={FormFields.genre}
              className={errorsGenre ? 'error' : ''}
              value={this.state.form.genre}
              onChange={this.handleInputChange}
            >
              <option value="default" disabled>
                Choose an option
              </option>
              <option value={Genre.comedy}>{Genre.comedy}</option>
              <option value={Genre.horror}>{Genre.horror}</option>
              <option value={Genre.action}>{Genre.action}</option>
              <option value={Genre.crime}>{Genre.crime}</option>
              <option value={Genre.thriller}>{Genre.thriller}</option>
              <option value={Genre.drama}>{Genre.drama}</option>
            </select>
          </div>
          <div className="field-errors">{showErrors(errorsIsConfirmPolitics)}</div>
          <div className="form__field-row policy">
            <div>
              <input
                type="checkbox"
                id={FormFields.isConfirmPolitics}
                name={FormFields.isConfirmPolitics}
                className={errorsIsConfirmPolitics ? 'error' : ''}
                checked={this.state.form.isConfirmPolitics}
                value={this.state.form.isConfirmPolitics ? 'checked' : ''}
                onChange={this.handleInputChange}
              />
            </div>
            <label htmlFor={FormFields.isConfirmPolitics}>This movie is censored</label>
          </div>
          <div className="switcher status">
            <div>Adult:</div>
            <div className="switch">
              <input
                type="checkbox"
                id={FormFields.adult}
                name={FormFields.adult}
                checked={this.state.form.adult}
                onChange={this.handleInputChange}
              />
              <label htmlFor={FormFields.adult} />
            </div>
          </div>
          <div className="field-errors">{showErrors(errorsLogo)}</div>
          <div className="form__field-row file">
            <label>Load picture:</label>
            <input
              type="file"
              name={FormFields.logo}
              accept="image/*"
              className={errorsLogo ? 'error' : ''}
              style={{ display: 'none' }}
              onChange={this.handleChangeImage}
              ref={(fileInput) => (this.fileInput = fileInput)}
              data-testid="form-upload"
            />
            <div className="btn-add-file" onClick={() => this.fileInput?.click()}>
              Pick file
            </div>
          </div>
          <input
            type="submit"
            disabled={!this.state.isFormChecked || !!this.state.errors.length}
            data-testid="form-submit-btn"
          />
        </form>
        <div className="spinner" style={{ position: 'absolute' }}>
          <Spinner isLoading={this.state.isLoading} />
        </div>
        {this.state.cards.length ? <FormsCards cards={this.state.cards} /> : <></>}
      </section>
    );
  }
}

export default Forms;
