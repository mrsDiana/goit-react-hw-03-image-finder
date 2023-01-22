import { Component } from 'react';
import { Overlay, Modal as ModalImg } from './Modal.styled';

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
  render() {
    return (
      <Overlay>
        <ModalImg>
          <img width="1400" height="900" src={this.props.src} alt="" />
        </ModalImg>
      </Overlay>
    );
  }
}
