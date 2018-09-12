import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { AppBar, FlatButton } from 'material-ui';
import { Welcome, Room } from './views';
import { logout } from './actions';
import { palette } from './palette';

class App extends Component {
  handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    console.log('Color ', palette.blue0);

    return (
      <Router>
        <Switch>
          <Route path="/" exact render={
            () => {
              return (
                <div>
                  <AppBar title="Chat App" color={`${palette.grey}`} />
                  <Welcome />
                </div>
              )
            }
          } />
          <Route path="/room/:room" exact render={
            ({ match }) => {
              return (
                <div>
                  <AppBar
                    title={`Room ${match.params.room}`}
                  />
                  <Room currentRoom={match.params.room} />
                </div>
              )
            }
          } />
        </Switch>
      </Router>
    );
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
