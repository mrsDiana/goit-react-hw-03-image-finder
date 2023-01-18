import React, { Component } from 'react';
import { toast } from 'react-toastify';

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
      <header className="searchbar">
        <form onSubmit={this.handelSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name="img"
            value={this.state.inputImg}
            onChange={this.handelImgChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
