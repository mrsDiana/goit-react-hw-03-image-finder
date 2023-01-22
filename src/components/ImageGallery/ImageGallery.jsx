import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import { ImageGallery as Gallery } from './ImageGallery.styled';

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
      this.setState({ images: [] });
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
            console.log('load more');
            this.setState({
              images: [...prevState.images, ...data.hits],
            });
          } else {
            console.log(data.total);
            this.setState({ page: 1 });
            this.setState({
              images: data.hits,
              total: data.total,
            });
          }
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMoreButton = () => {
    console.log(this.state.page);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    return (
      <div>
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && (
          <Gallery>
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  src={image.webformatURL}
                  alt={image.tags}
                  srcModal={image.largeImageURL}
                />
              );
            })}
            {this.state.images.length + 1 < this.state.total && (
              <LoadMore onClick={this.loadMoreButton} />
            )}
          </Gallery>
        )}
      </div>
    );
  }
}