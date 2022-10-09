import React, { Component, createRef, FormEvent } from 'react';
import './forms.scss';
import { Genre, IDateTypeField, IStateForms } from '../../interfaces';

class Forms extends Component {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeDateType = this.changeDateType.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  state: IStateForms = {
    form: {
      title: '',
      overview: '',
      country: '',
      releaseDate: '',
      genre: undefined,
      isConfirmPolitics: false,
      adult: false,
      logo: undefined,
    },
    dateType: 'text',
    submit: false,
  };

  fileInput: HTMLInputElement | null = null;

  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;
    console.log(event);
    console.log(name);
    console.log(value);
    this.setState((prevState: IStateForms) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
    console.log(this.state);
  }

  handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files as FileList;
    const imageFile = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result;
      const img = new Image();
      img.onload = () => {
        this.setState((prevState: IStateForms) => ({
          form: {
            ...prevState.form,
            logo: result,
          },
        }));
      };
      img.onerror = () => {
        this.setState((prevState: IStateForms) => ({
          form: {
            ...prevState.form,
            logo: undefined,
          },
        }));
      };
      img.src = result as string;
      console.log('result', result);
    };
    fileReader.readAsDataURL(imageFile);
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
      <>
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
            <select
              name="genre"
              defaultValue={'default'}
              value={this.state.form.genre}
              onChange={this.handleInputChange}
            >
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
            <input
              type="file"
              name="logo"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.handleChangeImage}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <button onClick={() => this.fileInput?.click()}>Pick file</button>
          </div>
          <input type="submit" value="Submit" disabled={this.state.submit} />
        </form>
        <pre style={{ textAlign: 'left', margin: '0 auto' }}>
          {JSON.stringify(this.state, null, 4)}
        </pre>
        <div>
          <img src={this.state.form.logo} alt="" />
        </div>
      </>
    );
  }
}

export default Forms;
