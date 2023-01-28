import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    img: '',
    isSubmit: false,
    loading: false,
    page: 1,
  };

  handelFormSubmit = img => {
    this.setState({
      img,
      isSubmit: true,
      loading: true,
      page: 1,
    });
  };
  pageIncrise = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  changeStatus = () => {
    this.setState({
      isSubmit: false,
      loading: false,
    });
  };

  render() {
    const { img, page, isSubmit, loading } = this.state;
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
        {loading && <Loader />}
        <ImageGallery
          searchImg={img}
          page={page}
          isSubmit={isSubmit}
          pageIncrise={this.pageIncrise}
          changeStatus={this.changeStatus}
        />
        <ToastContainer />
      </div>
    );
  }
}
