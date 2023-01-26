import { Component } from 'react';
import { Overlay, Modal as ModalImg } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeEsc);
  }

  closeEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  closeClick = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };
  render() {
    return (
      <Overlay onClick={this.closeClick}>
        <ModalImg>
          <img width="1400" height="900" src={this.props.src} alt="" />
        </ModalImg>
      </Overlay>
    );
  }
}
Modal.propTypes = {
  src: PropTypes.string,
  onClose: PropTypes.func,
};
