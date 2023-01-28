import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { fetchImg } from './FetchImg';
import { ImageGallery as Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.searchImg !== this.props.searchImg ||
      prevProps.page !== this.props.page
    ) {
      if (this.props.isSubmit) {
        this.setState({
          images: [],
        });
      }
      fetchImg(this.props.searchImg, this.props.page).then(data => {
        const { images } = data;
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
        this.props.changeStatus();
      });
    }
  }

  render() {
    const { images } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          justifyItems: 'center',
        }}
      >
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
          </Gallery>
        )}
        {images.length >= this.props.page * 12 && (
          <LoadMore onClick={this.props.pageIncrise} />
        )}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  searchImg: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  isSubmit: PropTypes.bool.isRequired,
  pageIncrise: PropTypes.func,
  changeStatus: PropTypes.func,
};
