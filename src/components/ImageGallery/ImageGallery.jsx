import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImg !== this.props.searchImg) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchImg}&page=1&key=31283318-f84bd36e26b769e2b71141abe&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ images: data.hits }))
        .finally(() => this.setState({ loading: false }));
    }
    if (prevState.images !== this.state.images) {
      this.state.images.length === 0 && toast.info('Input the new name');
    }
  }
  render() {
    return (
      <div>
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && (
          <ul className="gallery">
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  src={image.webformatURL}
                  alt={image.tags}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
