import React from 'react';
import './Alert.css';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div className="alert alert-info">
          <span>Streamcat.TV is currently in early development. Bugs are expected!</span>
      </div>
    )
  }
}
