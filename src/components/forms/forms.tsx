import React, { Component, FormEvent } from 'react';
import './forms.scss';
import { Genre, IDateTypeField, IStateForms, MovieStatus } from '../../interfaces';

class Forms extends Component {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeDateType = this.changeDateType.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  state: IStateForms = {
    form: {
      title: '',
      overview: '',
      country: '',
      releaseDate: '',
      genre: null,
      isConfirmPolitics: false,
      adult: false,
      logo: undefined,
    },
    dateType: 'text',
    submit: false,
  };

  handleInputChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) {
    const target = event.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;
    this.setState((prevState: IStateForms) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  }

  changeDateType(fieldType: IDateTypeField) {
    const dateType = fieldType;
    this.setState({ dateType });
  }

  saveForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(this.state);
  }

  render(): React.ReactNode {
    return (
      <form id="form-add-movie" className="form-add-movie" onSubmit={(e) => this.saveForm(e)}>
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
            min="1997-01-01"
            max="2030-12-31"
            name="releaseDate"
            value={this.state.form.releaseDate}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form__field-row">
          <label>Genre:</label>
          <select defaultValue={'default'}>
            <option value={'default'} disabled>
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
              defaultChecked={false}
              value={this.state.form.isConfirmPolitics ? 'checked' : ''}
              onChange={this.handleInputChange}
            />
          </div>
          <label htmlFor="isConfirmPolitics">This movie is censored</label>
        </div>
        <div className="switcher status">
          <div>Adult: </div>
          <div className="switch">
            <input
              type="checkbox"
              name="adult"
              id="adult"
              value={this.state.form.adult ? 'adult' : 'regular'}
              onChange={this.handleInputChange}
            />
            <label htmlFor="adult" />
          </div>
        </div>
        <div className="form__field-row file">
          <label>Load picture:</label>
          <input type="file" name="logo" onChange={this.handleInputChange} />
        </div>
        <input type="submit" value="Submit" disabled={this.state.submit} />
      </form>
    );
  }
}

export default Forms;
