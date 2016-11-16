import React from 'react'
import HlsPlayer from '../components/HlsPlayer';

import './Live.css';

export default class extends React.Component {

  constructor(url) {
    super();
    this.channel = null;
    this.url = url;
  }


  componentDidMount() {
    // this.loadStream((stream) => {
    //   console.log('loading stream...', stream);
    //   this.setState({ stream: stream });
    //
    // });
  }

  loadStream = (cb) => {
    // TODO: Fetch stream api.

    const stream = 'test';
    cb(stream);
  }

  render () {
    const { channel } = this.props.params;
    const videoUrl = `http://192.168.99.100:8080/live/${channel}.m3u8`;
    return (
      <div className="list">
        <div className="container">
          <HlsPlayer url={videoUrl} />
        </div>
      </div>
    )
  }
}
