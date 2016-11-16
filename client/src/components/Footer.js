import React from 'react'
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
              <li><a className="FooterLink" href="#">About</a></li>
              <li><a className="FooterLink" href="#">Github</a></li>
              <li><a className="FooterLink" href="#">API</a></li>
              <li><a className="FooterLink" href="#">Terms</a></li>
            </ul>
          </footer>
      </div>
    )
  }
}
