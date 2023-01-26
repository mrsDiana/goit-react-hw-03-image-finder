import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    img: '',
    isLoading: false,
    isSubmit: false,
  };

  handelFormSubmit = img => {
    this.setState({
      img,
      isSubmit: true,
    });
  };

  isLoading = value => {
    this.setState({
      isLoading: value,
    });
  };

  changeSubmit = () => {
    this.setState({
      isSubmit: false,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handelFormSubmit} />
        {this.state.isLoading && <Loader />}

        <ImageGallery
          searchImg={this.state.img}
          isLoading={this.isLoading}
          isSubmit={this.state.isSubmit}
          changeSubmit={this.changeSubmit}
        />

        <ToastContainer />
      </div>
    );
  }
}
