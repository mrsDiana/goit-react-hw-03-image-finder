import { Component } from 'react';

export class LoadMore extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}
