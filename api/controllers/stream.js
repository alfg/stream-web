import fetch from 'isomorphic-fetch';
import request from 'request';
import config from 'config';
import streamService from '../services/stream';

const stream = {

  streams: function(req, res) {
    streamService.featuredStreams(function(data) {
      res.json({ streams: data });
    })
  },

  featuredStreams: function(req, res) {
    streamService.featuredStreams(function(data) {
      res.json({ streams: data });
    })
  },

  createStream: function(req, res) {
    streamService.createStream(req.body, function(status, data) {
      if (status === 201) {
        res.status(201).json({ stream: data });
      } else {
        res.status(400).json({ errors: data });
      }
    });
  },

  getStream: function(req, res) {
    streamService.getStream(req.params.name, function(data) {
      res.json(data);
    });
  },

  isStreamActive: function(req, res) {
    streamService.isStreamActive(req.params.name, function(data) {
      res.json(data);
    });
  }

}

export default stream;
