import React from 'react'
import { Link } from 'react-router';
import './Footer.css';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
          <footer>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><a href="https://github.com/streamcatTV">Github</a></li>
              <li><a href="https://developers.streamcat.tv">API</a></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </footer>
      </div>
    )
  }
}
