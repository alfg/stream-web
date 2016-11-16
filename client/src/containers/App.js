import React, { Component } from 'react';
import Home from './Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class App extends Component {
  render () {
    const { content, navbar, footer } = this.props;
    return (
      <div>
        <div className="Header">
          {navbar || <Navbar />}
        </div>
        <div className="Main">
          {content || <Home />}
        </div>
        <div className="Footer">
          {footer || <Footer />}
        </div>
      </div>
    )
  }
}

export default App;
