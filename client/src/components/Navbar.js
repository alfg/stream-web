import React from 'react';
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
                <li className="NavbarItem"><a href="#" className="NavbarLink">Explore</a></li>
                <li className="NavbarItem"><a href="#" className="NavbarLink">Create</a></li>
                <li className="NavbarItem"><a href="#" className="NavbarLink" href="#">How-to</a></li>
              </ul>
            </div>
          </nav>
      </div>
    )
  }
}
