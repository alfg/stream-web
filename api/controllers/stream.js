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
    const url = `${config.streamApi}/streams/featured`;
    fetch(url)
      .then(function(response) {
        response.json().then(function(json) {
          console.log(json);
          res.json({ streams: json });
        })
      });
  },

  createStream: function(req, res) {
    const { title, type, description, _private, stream_name } = req.body;
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
            res.status(201).json({ stream: json });
          } else {
            res.status(400).json({ errors: json });
          }
        }, function(error) {
          console.log(error);
        })
      });
  },

  getStream: function(req, res) {
    const url = `${config.streamApi}/streams/${req.params.name}`;
    fetch(url).then(function(response) {
        response.json().then(function(json) {
          res.json(json);
        })
      });
  },

  isStreamActive: function(req, res) {
    const url = `${config.streamApi}/streams/${req.params.name}/active`;
    fetch(url).then(function(response) {
        response.json().then(function(json) {
          res.json(json);
        })
      });
  },

}

export default stream;
