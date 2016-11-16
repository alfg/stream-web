import fetch from 'isomorphic-fetch';
import request from 'request';
import config from 'config';

const stream = {

  streams: function(req, res) {
    fetch('/api/featured-streams')
      .then((response) => {
        res.json({ streams: res.json() });
      });
  },

  featuredStreams: function(req, res) {
    const url = `${config.streamApi}/streams`;
    fetch(url)
      .then(function(response) {
        response.json().then(function(json) {
          console.log(json);
          res.json({ streams: json });
        })
      });
  }

}

export default stream;
