import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, FlatButton } from 'material-ui';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { login, addRoom } from '../actions';

import { WelcomeWrapper } from './welcome.style';

class Welcome extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      room: null
    }
  }

  handleLogin() {
    const { username, room } = this.state;

    if (username && username.length > 0 && room && room.length > 0 ) {
      this.props.dispatch(login({ username, room }));
    }
  }

  handleInput(input) {
    this.setState({
      [input.target.name]: input.target.value
    })
  }

  render() {
    const { room } = this.state;
    let link = '/';

    if ( room ) { link = '/room/' + room }

     return (
      <WelcomeWrapper>
        <Card className="card">
          <CardTitle title="Welcome" />
          <CardText>
            To start chat, please enter your name and name of the room.
            <TextField
              required
              id="welcome-username"
              hintText="E.g. Alice, Bob, ..."
              floatingLabelText="Your display name"
              name="username"
              onChange={this.handleInput.bind(this)}
            />
            <TextField
              required
              id="room"
              hintText="Enter name of the room"
              floatingLabelText="Room name"
              name="room"
              onChange={this.handleInput.bind(this)}
            />
          </CardText>
          <CardActions className="buttonWrapper">
            <Link to={link}>
              <FlatButton
                className="startButton"
                onTouchTap={this.handleLogin.bind(this)}
              >
                Start
              </FlatButton>
            </Link>
          </CardActions>
        </Card>
      </WelcomeWrapper>
    );
  }
}

export default connect()(Welcome);
