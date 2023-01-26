import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import {
  Searchbar as Search,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    inputImg: '',
  };

  handelImgChange = event => {
    this.setState({ inputImg: event.currentTarget.value.toLowerCase() });
  };
  handelSubmit = event => {
    const { inputImg } = this.state;
    event.preventDefault();
    if (inputImg.trim() === '') {
      return toast.error('Input the name');
    }
    this.props.onSubmit(inputImg);
    this.setState({ inputImg: '' });
  };

  render() {
    return (
      <Search>
        <SearchForm onSubmit={this.handelSubmit}>
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="img"
            value={this.state.inputImg}
            onChange={this.handelImgChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Search>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
