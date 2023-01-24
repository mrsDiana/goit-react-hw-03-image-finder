import { Component } from 'react';
import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export class LoadMore extends Component {
  render() {
    return (
      <Button type="button" onClick={this.props.onClick}>
        Load more
      </Button>
    );
  }
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
