import React from 'react';

export default class Tile extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    return (
      <td
        className={this.props.className}
        onClick={() => this.props.playOnBoard(this.props.index)}
      >
        {this.props.value !== '-' ? this.props.value : ''}
      </td>
    );
  }
}
