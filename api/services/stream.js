import fetch from 'isomorphic-fetch';
import request from 'request';
import config from 'config';

const stream = {

  getAuth: function(callback) {
    const key = new Buffer(`${config.api_key}:${config.api_secret}`).toString('base64');
    const url = `${config.streamApi}/token`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${key}`
      }
    };
    fetch(url, options)
      .then((response) => {
        response.json().then(function(json) {

          var token = json.token;
          callback(token);
        })
      });
  },

  streams: function(callback) {
    fetch('/api/featured-streams')
      .then((response) => {
        callback(res.json());
      });
  },

  featuredStreams: function(callback) {
    const url = `${config.streamApiV1}/streams/featured`;
    fetch(url)
      .then(function(response) {
        response.json().then(function(json) {
          callback(json);
        })
      });
  },

  createStream: function(body, callback) {
    const { title, type, description, _private, stream_name } = body;
    const url = `${config.streamApiV1}/streams`;
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

    // Creating a stream requires an auth token.
    // TODO: Cache.
    stream.getAuth(function(token) {
      options.headers['Authorization'] = `Bearer ${token}`

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
      });
  },

  getStream: function(streamName, callback) {
    const url = `${config.streamApiV1}/streams/${streamName}`;
    fetch(url).then(function(response) {
        response.json().then(function(json) {
          callback(json);
        })
      });
  },

  isStreamActive: function(streamName, callback) {
    const url = `${config.streamApiV1}/streams/${streamName}/active`;
    fetch(url).then(function(response) {
        response.json().then(function(json) {
          callback(json);
        })
      });
  }

}

export default stream;
