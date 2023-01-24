import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItem as ImageGallery,
  ImageGalleryItemImg,
} from './ImageGallery.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  onOpenImg = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  onCloseImg = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  render() {
    const { src, alt, srcModal } = this.props;
    return (
      <ImageGallery>
        <ImageGalleryItemImg src={src} alt={alt} onClick={this.onOpenImg} />
        {this.state.isModalOpen && (
          <Modal onClose={this.onCloseImg} src={srcModal} />
        )}
      </ImageGallery>
    );
  }
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  srcModal: PropTypes.string,
};
