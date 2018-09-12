import Koa from 'koa';
import IO from 'koa-socket';

const app = Koa();
const io = new IO();

io.attach(app);

io.on('connection', ctx => {
  console.log('[server] connected');
});

let usernames = [];
let rooms = [];
io.on('disconnect', ctx => {
  const { username } = ctx.socket;
  if (username) {
    usernames = usernames.filter(u => u !== username)
  }
});

io.on('login', (ctx, { username, room }) => {
  usernames.push(username);
  ctx.socket.username = username;
  rooms.push(room);
  ctx.socket.currentRoom = room;

  io.broadcast('users.login', { username, room });
  io.broadcast('rooms.addRoom', { room });
});

io.on('addRoom', (ctx, { room }) => {
  rooms.push(room);
  ctx.socket.rooms = rooms;
  ctx.socket.currentRoom = room;

  io.broadcast('rooms.addRoom', { room });
});

io.on('changeRoom', (ctx, { room }) => {
  ctx.socket.currentRoom = room;

  io.broadcast('app.changeRoom', { room });
});

io.on('logout', ctx => {
  const { username } = ctx.socket;
  if (username) {
    usernames = usernames.filter(u => u !== username)
    delete ctx.socket['username'];

    io.broadcast('users.logout', { username });
  }
});

let messages = [];
io.on('message', (ctx, { text, room }) => {
  const message = {
    id: messages.length,
    text,
    username: ctx.socket.username,
    room
  };
  messages.push(message);

  io.broadcast('messages.new', { message });
});

app.listen(3000, () => {
  console.log('[server] ready');
});
