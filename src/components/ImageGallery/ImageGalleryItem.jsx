import {
  ImageGalleryItem as ImageGallery,
  ImageGalleryItemImg,
} from './ImageGallery.styled';

export const ImageGalleryItem = ({ src, alt }) => {
  return (
    <ImageGallery>
      <ImageGalleryItemImg src={src} alt={alt} />
    </ImageGallery>
  );
};
