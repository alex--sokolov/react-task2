import React, { Component } from 'react';
import './forms.scss';
import { IForm } from '../../interfaces';

class Forms extends Component {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state: IForm = {
    name: '',
    surname: '',
    zipCode: '',
  };

  handleInputChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) {
    const target = event.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  }

  render(): React.ReactNode {
    return (
      <form className="form-add-card">
        <h1>Add new card</h1>
        <div className="form__field-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form__field-row">
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={this.state.surname}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form__field-row">
          <label>Zip code</label>
          <input
            type="text"
            name="zipCode"
            value={this.state.zipCode}
            onChange={this.handleInputChange}
          />
        </div>

        <input type="checkbox" name="name" defaultChecked={true} />
        <textarea defaultValue={'some default'} />
        <input type="radio" defaultChecked={true} />
        <select defaultValue={'one'}>
          <option value={'some default'} disabled>
            Choose an option
          </option>
          <option value={'two'}>Two</option>
        </select>
      </form>
    );
  }
}

export default Forms;
