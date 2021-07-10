import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';

function Message({ username, message }) {
  const isUser = username === message.username;
  // [6] Check if username is [equivalent] to message.username then, => isUser = True

  // [12] If 'True', then show the 'message__user' otherwise stick to 'message'
  // [13] If 'isUser' => 'message__userCard', Else => 'message__guestCard' || Conditional Ternary Operator (?:) || if else

  // {message.username}: {message.message} => pulling right from the db
  return (
    <div className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
        <CardContent>
          <Typography color='white' variant='h5' component='h2'>
            {message.username}: {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Message;
