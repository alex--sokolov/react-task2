import React, { ChangeEvent, Component } from 'react';
import './search-bar.scss';
import { IForm } from '../../interfaces';

class SearchBar extends Component<Readonly<{ changeMovieState: any }>, unknown> {

  state = {
    searchValue: '',
    movies: [],
  };

  onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getMoviesBySearch = async (search: string) => {
    try {
      let data = [];
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        }),
      });
      console.log('response.status', response.status);
      console.log('response.ok', response.ok);
      console.log('response', response);
      if (response.ok) {
        console.log('response.type', response.type);
        data = (await response.json()).docs;
        console.log('data', data);

        const {changeMovieState} = this.props;
        changeMovieState({
          movies: data
        })
      } else {
        if (response.status === 401) {
          console.log('Not authorized');
        }
      }

      //
      // console.log('data', data);
      // if (response.ok) {
      //   console.log(response);
      //
      //   console.log(data);
      // }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('searchValue: ', this.state.searchValue);
      console.log('enter press here!!! ');
      return await this.getMoviesBySearch(this.state.searchValue);
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
