import React from 'react'
import 'isomorphic-fetch';
import HlsPlayer from '../components/HlsPlayer';

import './Live.css';

export default class extends React.Component {

  constructor(url) {
    super();
    this.state = {
      streamReady: false,
      streamData: null
    }
    this.heartbeatInterval = 10000;
  }

  componentWillMount() {
    this.getContextData(this.props.params.channel);
    this.setHeartbeat(this.props.params.channel, this.heartbeatInterval);
  }

  getContextData(channel) {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const url = `/api/stream/${channel}`;

    fetch(url, options).then((response) => {
      response.json().then((json) => {
        this.setState({ streamData: json });
      });
    });
  }

  setHeartbeat(channel, interval) {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const url = `/api/stream/${channel}/active`;

    const fn = () => {
      fetch(url, options).then((response) => {
        response.json().then((json) => {
          this.setState({ streamReady: json.active });
        });
      });
    }
    setInterval(fn, this.heartbeatInterval);
    fn();
  }

  render () {
    const { channel } = this.props.params;
    const streamData = this.state.streamData;
    return (
      <div className="list">
        <div className="container">
          { streamData &&
            <div>
              <h1>{streamData.title}</h1>
              <h4>{streamData.type}</h4>
              <p>{streamData.description}</p>
            </div>
          }
          { this.state.streamReady ? <HlsPlayer url={streamData.video_url} /> : <h2>Offline</h2> }
        </div>
      </div>
    )
  }
}
