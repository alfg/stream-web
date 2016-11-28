import React from 'react'
import HlsPlayer from '../components/HlsPlayer';
import 'isomorphic-fetch';
import storage from '../core/Storage.js';

export default class extends React.Component {

  constructor(url) {
    super();
    this.state = {
      streamReady: false,
      store: null
    }
    this.storage = storage;
    this.heartbeatInterval = 5000;
  }

  componentDidMount() {
    // const store = this.props.store;
    // const videoUrl = `http://192.168.99.100:8080/live/${store.stream_name}.m3u8`;
  }

  componentWillMount() {
    this.storage.getItem('streamData', (err, data) => {
      if (!err) {
        this.setState({ store: data });
      }
      const stream = this.state.store.stream.stream_name;
      this.setHeartbeat(stream, this.heartbeatInterval);
    });
  }

  setHeartbeat(name, interval) {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const url = `/api/stream/${name}/active`;

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
    if (!this.state.store) {
      return null;
    }

    const stream = this.state.store.stream;
    const streamUrl = `rtmp://192.168.99.100:1935/stream`;
    const key = `${stream.stream_name}?key=${stream.stream_key}`;
    const shareUrl = `http://127.0.0.1:3000/live/?stream=${stream.stream_name}`;
    const videoUrl = `http://192.168.99.100:8080/live/${stream.stream_name}.m3u8`;

    return (
        <div className="container">
          <div className="header">
            <h4>Dashboard</h4>
            <p>Welcome to your dashboard! You can view your connection info and stats here. Happy Streaming!</p>
          </div>

          <div className="twelve columns">
            <h4>Connection Settings</h4>
            <table className="u-full-width">
              <tbody>
                <tr>
                  <td>Stream URL</td>
                  <td><span>{streamUrl}</span></td>
                  <td>Set your broadcasting client to use this URL.</td>
                </tr>
                <tr>
                  <td>Stream Key</td>
                  <td>{key}</td>
                  <td>Keep this a secret! This is how we identify your stream!</td>
                </tr>
                <tr>
                  <td>Share URL</td>
                  <td>{shareUrl}</td>
                  <td>Share this URL to your viewers!</td>
                </tr>
              </tbody>
            </table>

            <h4>Preview</h4>
            { this.state.streamReady && <HlsPlayer url={videoUrl} /> }
          </div>
        </div>
    )
  }
}
