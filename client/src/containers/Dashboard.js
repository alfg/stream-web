import React from 'react'
import HlsPlayer from '../components/HlsPlayer';
import 'isomorphic-fetch';

export default class extends React.Component {

  constructor(url) {
    super();
    this.state = {
      streamReady: false
    }
  }

  static getInitialProps({ req }) {
    return req
      ? { store: {} }
      : { store: window.store }
  }

  componentDidMount() {
    // const store = this.props.store;
    // const videoUrl = `http://192.168.99.100:8080/live/${store.stream_name}.m3u8`;
    // this.checkStream(videoUrl);
  }

  componentWillMount() {
  }

  async checkStream(url) {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await fetch(url, options);
    // const data = await res.json();
    console.log(res);
    if (res.status == 405) {
      setTimeout(() => {
        this.checkStream(url);
        console.log('check');
      }, 5000);
    } else {
      this.setState({ streamReady: true });
        console.log('check');
    }
    console.log(res.status);
  }

  render () {
    console.log(this.props);
    const store = this.props.store;
    const streamUrl = `rtmp://192.168.99.100:1935/stream`;
    const key = `${store.stream_name}?key=${store.stream_key}`;
    const shareUrl = `http://127.0.0.1:3000/live/?stream=${store.stream_name}`;
    const videoUrl = `http://192.168.99.100:8080/live/${store.stream_name}.m3u8`;

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
            { store.stream_name && <HlsPlayer url={videoUrl} /> }
          </div>
        </div>
    )
  }
}
