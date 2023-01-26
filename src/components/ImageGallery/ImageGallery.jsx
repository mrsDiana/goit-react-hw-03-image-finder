import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { toast } from 'react-toastify';
import { ImageGallery as Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: [],
    total: null,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    this.reset();
    if (prevProps.searchImg !== this.props.searchImg && this.state.page === 1) {
      this.fetchImg(prevProps.searchImg);
    }
    if (prevState.page !== this.state.page) {
      this.fetchImg(prevProps.searchImg);
    }
  }
  reset = () => {
    if (this.props.isSubmit) {
      this.setState({
        images: [],
        page: 1,
      });
      this.props.changeSubmit();
    }
  };
  fetchImg = async prevPropsSearchImg => {
    const res = await fetch(
      `https://pixabay.com/api/?q=${this.props.searchImg}&page=${this.state.page}&key=31283318-f84bd36e26b769e2b71141abe&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await res.json();

    if (data.hits.length === 0) {
      return toast.info('Input the new name');
    }
    if (prevPropsSearchImg !== this.props.searchImg) {
      return this.setState({
        images: data.hits,
        total: data.total,
      });
    } else {
      return this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    }
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
            {images.length + 1 < total && (
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
