import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  login, logout, addUser, removeUser, addRoom, changeRoom, newMessage
} from './actions';

const initial = {
  app: {
    username: null,
    currentRoom: null
  },
  users: {},
  rooms: [],
  messages: {
    list: [],
    entities: {},
    room: null,
  },
};

const app = createReducer({
  [login]: (state, payload) => {
    return { ...state, username: payload.username, currentRoom: payload.room };
  },
  [logout]: (state, payload) => {
    return { ...state, username: null };
  },
  [changeRoom]: (state, payload) => {
    return { ...state, currentRoom: payload.room }
  }
}, initial.app);

const users = createReducer({
  [addUser]: (state, payload) => {
    return { ...state, [payload.username]: true };
  },
  [removeUser]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  }
}, initial.users);

const rooms = createReducer({
  [addRoom]: (state, payload) => {
    return [ ...state, payload.room ]
  }
}, initial.rooms);

const messages = createReducer({
  [newMessage]: (state, payload) => {
    const { message } = payload;

    return {
      ...state,
      list: [ ...state.list, message.id ],
      entities: { ...state.entities, [message.id]: message }
    };
  }
}, initial.messages);

export default combineReducers(
  { app, users, rooms, messages }
);
