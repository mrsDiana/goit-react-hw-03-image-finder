import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItem as ImageGallery,
  ImageGalleryItemImg,
} from './ImageGallery.styled';

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
    console.log('close');
    this.setState({
      isModalOpen: false,
    });
  };
  render() {
    return (
      <ImageGallery>
        <ImageGalleryItemImg
          src={this.props.src}
          alt={this.props.alt}
          onClick={this.onOpenImg}
        />
        {this.state.isModalOpen && (
          <Modal onClose={this.onCloseImg} src={this.props.srcModal} />
        )}
      </ImageGallery>
    );
  }
}
