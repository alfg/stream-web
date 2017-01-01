import fetch from 'isomorphic-fetch';
import request from 'request';
import config from 'config';

const stream = {

  streams: function(callback) {
    fetch('/api/featured-streams')
      .then((response) => {
        callback(res.json());
      });
  },

  featuredStreams: function(callback) {
    const url = `${config.streamApi}/streams/featured`;
    fetch(url)
      .then(function(response) {
        response.json().then(function(json) {
          console.log(json);
          callback(json);
        })
      });
  },

  createStream: function(body, callback) {
    const { title, type, description, _private, stream_name } = body;
    const url = `${config.streamApi}/streams`;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        title,
        type,
        description,
        private: _private,
        stream_name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch(url, options)
      .then(function(response) {
        response.json().then(function(json) {
          if (response.ok) {
            callback(201, json);
          } else {
            callback(400, json);
          }
        }, function(error) {
          console.log(error);
        })
      });
  },

  getStream: function(streamName, callback) {
    const url = `${config.streamApi}/streams/${streamName}`;
    fetch(url).then(function(response) {
        response.json().then(function(json) {
          callback(json);
        })
      });
  },

  isStreamActive: function(streamName, callback) {
    const url = `${config.streamApi}/streams/${streamName}/active`;
    fetch(url).then(function(response) {
        response.json().then(function(json) {
          callback(json);
        })
      });
  }

}

export default stream;
