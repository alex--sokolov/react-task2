import React, { ChangeEvent, Component } from 'react';
import './search-bar.scss';

class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('searchValue: ', this.state.searchValue);
      console.log('enter press here!!! ');
    }
  };

  componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      this.setState({
        searchValue: JSON.parse(searchValue),
      });
    }
  }

  componentDidUpdate(): void {
    localStorage.setItem('searchValue', JSON.stringify(this.state.searchValue));
  }

  render() {
    return (
      <section className="search-bar">
        <input
          id="search"
          type="text"
          data-testid="search"
          className="search"
          placeholder="Search"
          value={this.state.searchValue}
          onChange={(e) => {
            this.onSearchChange(e);
          }}
          onKeyPress={(e) => this.handleKeyPress(e)}
        />
        <label htmlFor="search" className="search-icon" data-testid="label-search" />
      </section>
    );
  }
}

export default SearchBar;
