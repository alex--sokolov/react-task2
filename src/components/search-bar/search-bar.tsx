import React, { ChangeEvent, Component } from 'react';
import './search-bar.scss';
import { IState } from '../../interfaces';

class SearchBar extends Component<
  Readonly<{
    changeMainState: React.Dispatch<React.SetStateAction<Pick<IState, 'movies' | 'isLoading'>>>;
  }>,
  unknown
> {
  state: Pick<IState, 'searchValue'> = {
    searchValue: '',
  };

  onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getMoviesBySearch = async (search?: string) => {
    const url = search
      ? `${process.env.REACT_APP_API_URL}?name=/${search}/i`
      : `${process.env.REACT_APP_API_URL}`;
    try {
      let data = [];
      const response = await fetch(url, {
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
        this.props.changeMainState({
          movies: data,
          isLoading: false,
        });
      } else {
        if (response.status === 401) {
          console.log('Not authorized');
        }
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      return await this.getMoviesBySearch(this.state.searchValue);
    }
  };

  async componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    const search = searchValue ? JSON.parse(searchValue) : null;
    if (search) {
      await this.getMoviesBySearch(search);
      this.setState({
        searchValue: search,
      });
    } else {
      setTimeout(() => {
        this.props.changeMainState({
          movies: [],
          isLoading: false,
        });
      }, 500);
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
