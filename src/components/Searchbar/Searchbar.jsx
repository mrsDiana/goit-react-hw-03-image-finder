import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Searchbar as Search,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
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
    event.preventDefault();
    if (this.state.inputImg.trim() === '') {
      return toast.error('Input the name');
    }
    this.props.onSubmit(this.state.inputImg);
    this.setState({ inputImg: '' });
  };
  render() {
    return (
      <Search>
        <SearchForm onSubmit={this.handelSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
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
