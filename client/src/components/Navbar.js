import React from 'react';
import { Link } from 'react-router';
import storage from '../core/Storage.js';
import './Navbar.css';
import Alert from './Alert.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.storage = storage;
    this.state = {
      hasDashboard: false
    }
  }

  componentWillMount() {
    this.storage.exists((err, data) => {
      if (err) {
        console.log(err);
      }
      this.setState({ hasDashboard: data });
    });
  }

  render () {
    return (
      <div>
          <nav className="Navbar">
            <div className="container">
            <h1 className="Title"><Link to="/">Streamcat<span className="TV">TV</span></Link></h1>
              <ul className="NavbarList">
                { this.state.hasDashboard && <li className="NavbarItem"><Link to="/dashboard" className="NavbarLink">Dashboard</Link></li> }
                <li className="NavbarItem"><Link to="/explore" className="NavbarLink">Explore</Link></li>
                <li className="NavbarItem"><Link to="/create" className="NavbarLink">Create</Link></li>
                <li className="NavbarItem"><Link to="/how-to" className="NavbarLink">How-to</Link></li>
              </ul>
            </div>
          </nav>

          <Alert />
      </div>
    )
  }
}
