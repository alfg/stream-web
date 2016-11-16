import React, { Component } from 'react';
import 'isomorphic-fetch';
import './Home.css';
import StreamList from '../components/StreamList';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      featuredStreams: []
    }
  }

  componentWillMount() {
    this.getFeaturedStreams();
  }

  async getFeaturedStreams() {
    const res = await fetch('/api/featured-streams');
    const data = await res.json();
    this.setState({ featuredStreams: data.streams });
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <div className="container">

          <div className="Header">
            <h4>Featured Streams</h4>
          </div>

          <StreamList streams={this.state.featuredStreams} />

        </div>
      </div>
    );
  }
}

export default Home;
