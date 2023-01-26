import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from './FetchImg';
import { ImageGallery as Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: [],
    total: null,
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    this.reset();
    if (prevProps.searchImg !== this.props.searchImg && this.state.page === 1) {
      this.searchInformation(prevProps.searchImg);
    }
    if (prevState.page !== this.state.page) {
      this.searchInformation(prevProps.searchImg);
    }
  }
  reset = () => {
    if (this.props.isSubmit) {
      this.setState({
        images: [],
        page: 1,
        total: null,
      });
      this.props.changeSubmit();
    }
  };
  isLoading = value => {
    this.setState({
      isLoading: value,
    });
  };

  searchInformation = prevPropsSearchImg => {
    this.isLoading(true);
    fetchImg(this.props.searchImg, this.state.page).then(data => {
      if (prevPropsSearchImg !== this.props.searchImg) {
        this.setState({
          images: data.images,
          total: data.total,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.images],
        }));
      }
    });
    this.isLoading(false);
  };

  loadMoreButton = () => {
    this.props.changeSubmit();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, total } = this.state;
    return (
      <div>
        {images.length > 0 && (
          <Gallery>
            {this.state.isLoading && <Loader />}
            {images.map(image => {
              const { id, webformatURL, tags, largeImageURL } = image;
              return (
                <ImageGalleryItem
                  key={id}
                  src={webformatURL}
                  alt={tags}
                  srcModal={largeImageURL}
                />
              );
            })}
            {images.length < total && (
              <LoadMore onClick={this.loadMoreButton} />
            )}
          </Gallery>
        )}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf({
    searchImg: PropTypes.string.isRequired,
  }),
};
