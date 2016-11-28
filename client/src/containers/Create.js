import React from 'react'
import { Link } from 'react-router';
import 'isomorphic-fetch';
import storage from '../core/Storage';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.storage = storage;
    this.state = {
      title: '',
      type: '',
      description: '',
      _private: false,
      stream_name: '',
      data: null,
      errors: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    console.log(this.state);
    this.submitForm();
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheck(e) {
    this.setState({[e.target.name]: e.target.checked});
  }

  async submitForm() {
    const { title, type, description, _private, stream_name } = this.state;

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
    const res = await fetch('/api/stream/create', options);
    const data = await res.json();

    console.log(data);
    console.log(res.status);

    if (res.status == 201) {
      this.setState({ data: data });
      this.storage.setItem('streamData', data, () => {
        console.log('Storing data', data);
      });

    } else {
      console.log('errors', data);
      this.setState({ errors: data.errors });
    }
  }

  render () {
    return (
        <div className="container">
          <div className="header">
            <h4>Create a Stream</h4>
            <p>Create a channel to stream your content. Once created, you'll receieve a Stream Key to
            configure your broadcasting client.</p>
          </div>

          <div className="twelve columns">

              <div className="row">
                <div className="six columns">
                  <label htmlFor="stream-name">Choose a Channel Name</label>
                  <input
                    id="stream-name"
                    name="stream_name"
                    className="u-full-width"
                    type="text"
                    placeholder=""
                    onChange={this.handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="six columns">
                  <label htmlFor="stream-title">Stream Title</label>
                  <input
                    id="stream-title"
                    name="title"
                    className="u-full-width"
                    type="text"
                    placeholder="Casual Gaming, etc"
                    onChange={this.handleChange} />
                </div>
                <div className="six columns">
                  <label htmlFor="stream-type">Stream Type</label>
                  <select
                    id="stream-type"
                    className="u-full-width"
                    name="type"
                    onChange={this.handleChange}>
                    <option value="gaming">Select</option>
                    <option value="gaming">Gaming</option>
                    <option value="coding">Coding</option>
                    <option value="live-event">Live Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="u-full-width"
                placeholder=""
                name="description"
                onChange={this.handleChange}></textarea>
              <label>
                <input type="checkbox"
                  name="_private"
                  defaultChecked={this.state.private}
                  onChange={this.handleCheck} />
                <span className="label-body">Private (Stream will not be publicy featured if enabled)</span>
              </label>
              <button className="button-primary" onClick={this.handleSubmit}>Create</button>

              { this.state.data &&
              <div>
                <h4>Your Stream is ready for casting!</h4>
                <Link to="/dashboard"><button className="button-secondary">Go to Dashboard</button></Link>
              </div> }

              { this.state.errors && Object.keys(this.state.errors).map((k, i) => {
                return <div>{k}: {this.state.errors[k]}</div>;
              })}

          </div>
        </div>
    )
  }
}
