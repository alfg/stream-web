import React from 'react'
import Hls from 'hls.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      live: false
    }
  }

  componentDidMount() {
    console.log('loading player...');

    const video = this.refs.video;

    const config = {
      manifestLoadingRetryDelay: 5000,
      manifestLoadingMaxRetryTimeout: 10000
    };

    const hls = new Hls(config);

    hls.loadSource(this.props.url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.setState({ live: true });
      video.play();
    });
    hls.on(Hls.Events.ERROR, (event, data) => {
      console.log(data);

      switch(data.details) {
        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
          // Retry.
          setTimeout(() => {
            console.log('retrying');
            hls.loadSource(this.props.url);
          }, 5000);
          break;

        default:
          break;
      }
    });
  }

  render () {
    return (
      <div>
        { !this.state.live && <h2>Offline</h2> }
        <video
          ref="video"
          height="800" width="1000"
          controls="true"
        >
        </video>
      </div>
    )
  }
}
