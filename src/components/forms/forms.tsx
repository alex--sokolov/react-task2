import React, { Component, FormEvent } from 'react';
import './forms.scss';
import { FieldError, Genre, IDateTypeField, IForm, IStateForms } from '../../interfaces';
import FormsCards from 'components/forms-cards/forms-cards';
import {
  isValidDate,
  isValidGenre,
  isValidMax,
  isValidMin,
  isValidOnlyEnglishSymbols,
} from '../../utils/validate';

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
  };
  fileInput: HTMLInputElement | null = null;

  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
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
        case 'title':
          errors = [...errors, ...this.validateTitle(value as string)];
          break;
        case 'overview':
          errors = [...errors, ...this.validateOverview(value as string)];
          break;
        case 'country':
          errors = [...errors, ...this.validateCountry(value as string)];
          break;
        case 'releaseDate':
          errors = [...errors, ...this.validateDate(value as string)];
          break;
        case 'genre':
          errors = [...errors, ...this.validateGenre(value as string)];
          break;
        case 'isConfirmPolitics':
          errors = [...errors, ...this.validateIsConfirmPolitics(value as boolean)];
          break;
        default:
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
  handleChangeImage(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!this.state.isFormChecked) {
      this.setState(() => ({ isFormChecked: true }));
    }
    this.setState(() => ({
      isLoading: true,
    }));
    const files = event.target.files as FileList;
    const imageFile = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result;
      const img = new Image();
      const errors = [...this.state.errors].filter((error: FieldError) => error.field !== 'logo');
      img.onload = () => {
        this.setState((prevState: IStateForms) => ({
          form: {
            ...prevState.form,
            logo: result,
          },
          isLoading: false,
          errors,
        }));
      };
      img.onerror = () => {
        const error = {
          field: 'logo',
          errors: ['Logo must be specified'],
        };
        errors.push(error);
        this.setState((prevState: IStateForms) => ({
          form: {
            ...prevState.form,
            logo: undefined,
          },
          isLoading: false,
          errors,
        }));
      };
      img.src = result as string;
    };
    fileReader.readAsDataURL(imageFile);
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
      errors.push(`Must be more than ${minLength} Symbols`);
    }
    if (!isValidMax(title, maxLength)) {
      errors.push(`Must be less than ${maxLength} Symbols`);
    }

    if (errors.length > 0) {
      result.push({
        field: 'title',
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
      errors.push(`Must be more than ${minLength} Symbols`);
    }
    if (!isValidMax(overview, maxLength)) {
      errors.push(`Must be less than ${maxLength} Symbols`);
    }

    if (errors.length > 0) {
      result.push({
        field: 'overview',
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

    if (errors.length > 0) {
      result.push({
        field: 'country',
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

    if (errors.length > 0) {
      result.push({
        field: 'releaseDate',
        errors,
      });
    }
    return result;
  }
  validateGenre(value?: string): FieldError[] {
    const result = [];
    const errors = [];
    const genre = value || this.state.form.genre;
    if (!isValidGenre(genre)) {
      errors.push(`Genre is not valid`);
    }

    if (errors.length > 0) {
      result.push({
        field: 'genre',
        errors,
      });
    }
    return result;
  }
  validateIsConfirmPolitics(value?: boolean): FieldError[] {
    const result = [];
    const isConfirmPolitics = value || this.state.form.isConfirmPolitics;
    if (!isConfirmPolitics) {
      result.push({
        field: 'isConfirmPolitics',
        errors: ['Movie must be censored!'],
      });
    }
    return result;
  }
  validateLogo(): FieldError[] {
    const result = [];
    if (!this.state.form.logo) {
      result.push({
        field: 'logo',
        errors: ['Logo must be specified'],
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
    const errors = this.validateForm();
    if (errors.length === 0) {
      this.saveForm();
    } else {
      this.setState(() => ({
        errors,
        submitted: true,
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
      };
    });
  }
  render(): React.ReactNode {
    return (
      <>
        <form
          id="form-add-movie"
          className="form-add-movie"
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <h1>Add new movie:</h1>
          <div className="form__field-row">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.form.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form__field-row">
            <label>Overview:</label>
            <input
              type="text"
              name="overview"
              value={this.state.form.overview}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form__field-row">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={this.state.form.country}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form__field-row">
            <label>Release date:</label>
            <input
              type={this.state.dateType}
              className={this.state.dateType === 'text' ? 'text' : 'date'}
              placeholder="MM/DD/YYYY"
              onFocus={() => this.changeDateType('date')}
              onBlur={() => this.changeDateType('text')}
              min={this.minDate}
              max={this.maxDate}
              name="releaseDate"
              value={this.state.form.releaseDate}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form__field-row">
            <label>Genre:</label>
            <select name="genre" value={this.state.form.genre} onChange={this.handleInputChange}>
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
          <div className="form__field-row policy">
            <div>
              <input
                type="checkbox"
                id="isConfirmPolitics"
                name="isConfirmPolitics"
                checked={this.state.form.isConfirmPolitics}
                value={this.state.form.isConfirmPolitics ? 'checked' : ''}
                onChange={this.handleInputChange}
              />
            </div>
            <label htmlFor="isConfirmPolitics">This movie is censored</label>
          </div>
          <div className="switcher status">
            <div>Adult:</div>
            <div className="switch">
              <input
                type="checkbox"
                name="adult"
                id="adult"
                checked={this.state.form.adult}
                value={this.state.form.adult ? 'adult' : 'regular'}
                onChange={this.handleInputChange}
              />
              <label htmlFor="adult" />
            </div>
          </div>
          <div className="form__field-row file">
            <label>Load picture:</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.handleChangeImage}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <div className="btn-add-file" onClick={() => this.fileInput?.click()}>
              Pick file
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.isFormChecked || this.state.errors.length > 0}
          />
        </form>
        <div className="spinner" style={{ position: 'absolute' }}>
          <div className={`lds-roller ${this.state.isLoading ? '' : 'hidden'}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <pre style={{ textAlign: 'left', margin: '0 auto', width: '200px' }}>
          {JSON.stringify(this.state, null, 4)}
        </pre>
        <FormsCards cards={this.state.cards} />
      </>
    );
  }
}

export default Forms;
