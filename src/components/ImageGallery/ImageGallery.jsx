import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import { ImageGallery as Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: [],
    total: null,
    page: 1,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchImg !== this.props.searchImg ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchImg}&page=${this.state.page}&key=31283318-f84bd36e26b769e2b71141abe&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          if (data.hits.length === 0) {
            return toast.info('Input the new name');
          }
          if (prevProps.searchImg === this.props.searchImg) {
            return this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
            }));
          } else {
            return this.setState({
              images: data.hits,
              total: data.total,
            });
          }
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { loading, images, total } = this.state;
    return (
      <div>
        {loading && <Loader />}
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
