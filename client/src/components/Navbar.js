import React from 'react';
import { Link } from 'react-router';
import './Navbar.css';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
          <nav className="Navbar">
            <div className="container">
              <ul className="NavbarList">
                <li className="NavbarItem"><Link to="/explore" className="NavbarLink">Explore</Link></li>
                <li className="NavbarItem"><Link to="/create" className="NavbarLink">Create</Link></li>
                <li className="NavbarItem"><Link to="/how-to" className="NavbarLink">How-to</Link></li>
              </ul>
            </div>
          </nav>
      </div>
    )
  }
}
