import React, { ChangeEvent, Component } from 'react';
import './search-bar.scss';
import { IFetchError, IState } from '../../interfaces';
import { getMoviesBySearch } from '../../utils/api';

class SearchBar extends Component<
  Readonly<{
    changeMainState: React.Dispatch<React.SetStateAction<Omit<IState, 'searchValue'>>>;
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

  getAPIMovies = async (search: string): Promise<void> => {
    const data = await getMoviesBySearch(search);
    if (Array.isArray(data)) {
      this.props.changeMainState((prevState) => {
        console.log(prevState);
        return {
          ...prevState,
          movies: data,
          isLoading: false,
        };
      });
      // this.props.changeMainState((prevState) => ({
      //   ...prevState,
      //   movies: data,
      //   isLoading: false,
      // }));
    } else {
      console.log('Error: ', data);
      this.props.changeMainState((prevState) => ({
        ...prevState,
        isLoading: false,
        fetchError: data as IFetchError,
        isShowError: true,
      }));

      setTimeout(() => {
        this.props.changeMainState((prevState) => ({
          ...prevState,
          isShowError: false,
        }));
      }, 2000);

      setTimeout(() => {
        this.props.changeMainState((prevState) => ({
          ...prevState,
          fetchError: null,
        }));
      }, 2500);
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await this.getAPIMovies(this.state.searchValue);
    }
  };

  async componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    const search = searchValue ? JSON.parse(searchValue) : null;
    if (search) {
      await this.getAPIMovies(search);
      this.setState({
        searchValue: search,
      });
    } else {
      setTimeout(() => {
        this.props.changeMainState({
          movies: [],
          isLoading: false,
          fetchError: null,
          isShowError: false,
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
        <label
          htmlFor="search"
          className="search-icon"
          data-testid="label-search"
          onClick={async () => await this.getAPIMovies(this.state.searchValue)}
        />
      </section>
    );
  }
}

export default SearchBar;
