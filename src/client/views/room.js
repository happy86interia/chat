import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { TextField, FlatButton } from 'material-ui';
import { sendMessage, addRoom, changeRoom } from '../actions';

import { RoomWrapper } from './room.style';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRoom: null
    }

    props.dispatch(changeRoom({ room: props.currentRoom }));
  }

  handleInput(input) {
    this.setState({
      [input.target.name]: input.target.value
    })
  }

  handleSend() {
    const text = document.getElementById('room-message').value;
    const room = this.props.currentRoom;
    this.props.dispatch(sendMessage({ text, room }));
    document.getElementById('room-message').value = '';
  }

  handleAddRoom() {
    const { newRoom } = this.state;

    this.props.dispatch(addRoom({ room: newRoom }));
    document.getElementById('add-room').value = '';
  }

  render() {
    const { app, messages, rooms, users, currentRoom } = this.props;
    const { newRoom } = this.state;

    const link = `/room/${newRoom}`;

    return (
      <RoomWrapper>
        <div className="contentWrapper">
          <div className="leftSide">
            <h3>User list:</h3>
            <List>
              {Object.keys(users).map((username, i) =>
                <ListItem primaryText={username} key={`${i}:${username}`} />
              )}
            </List>
            <h3>Rooms list:</h3>
            <div className="roomWrapper">
              <div className="roomInput">
                <TextField
                  id="add-room"
                  fullWidth={true}
                  hintText="Name of the new room"
                  name="newRoom"
                  onChange={this.handleInput.bind(this)}
                />
              </div>
              <div className="roomButton">
                <Link to={link}>
                  <FlatButton
                    className="button"
                    label="Add"
                    onTouchTap={this.handleAddRoom.bind(this)}
                  />
                </Link>
              </div>
            </div>
            <List className="roomsListWrapper">
              {rooms.map((room, i) => {
                const roomLink = `/room/${room}`;

                return (
                  <Link
                    className="roomItem"
                    key={`${i}:${room}`}
                    to={roomLink}
                  >
                    <ListItem style={currentRoom === room ? {fontWeight: 'bold'} : {}}>
                      Room: {room}
                    </ListItem>
                  </Link>
                )
              })}
            </List>
          </div>
          <div className="rightContent">
            <div className="massagesWrapper">
              <List>
                {messages.list.map(id => messages.entities[id]).map((m, i) => {
                  console.log('messages ', m);
                  if ( this.props.currentRoom === m.room ) {
                    return (
                      <ListItem
                        primaryText={m.text}
                        secondaryText={m.username}
                        key={`${i}:${m.id}`}
                      />
                    )
                  }
                })}
              </List>
            </div>
            <div className="addMassagesWrapper">
              <div className="addMassagesInput">
                <TextField id="room-message" fullWidth={true} hintText="Message" />
              </div>
              <div className="addMassagesButton">
                <FlatButton
                  className="button"
                  label="Send"
                  onTouchTap={this.handleSend.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </RoomWrapper>
    );
  }
}

function select({ app, messages, rooms, users  }) {
  return { app, messages, rooms, users };
}

export default connect(select)(Room);
