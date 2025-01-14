import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase'; // call from the actual module, && `db` above is from the config file
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import GithubCorner from 'react-github-corner';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState =  setting a variable || the unique way to set-up variable
  // useEffect = run code on a condition || block/piece/snippet of code that executed once the condition meet or component loads

  useEffect(() => {
    // run once when the 'App' component loads | ON condition
    // also called listener => because listening for any changes and run snapshot and other

    // Pulling 'messages' (collection) right from the (firestore db)
    // .onSnapshot => it will run to take snapshot(picture) => every single time db changes, (add\delete records )
    // (snapshot) => all information from the '.onSnapshot' function is put into this variable.
    // setMessages => lists messages of 'docs' from snapshot variable and map through every single (doc) && for every 'doc'
    // doc.data() => give the data from the every doc && return as an object
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []); // [] no dependencies, run once when the 'App' component loads

  useEffect(() => {
    // run code here...messages

    // const username = prompt('Please enter your name');
    setUsername(prompt('Please enter your name'));

    // if its blank dependencies inside [], this code runs ONCE when the App component loads
    // if we have a variable like [input], it runs every time input changes
  }, []); // here's the condition

  // console.log(input);
  // console.log(messages);

  const sendMessage = (event) => {
    // all the logic to send the message goes here...

    // Prevent default refreshing when enter submit form button
    event.preventDefault();

    // Add/send collection of 'messages' to db
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // NEW 'fieldValue' from the 'serverTimestamp()' of the firebase.firestore
    });

    // Input becomes empty string again
    setInput('');
  };

  return (
    <div className='App'>
      <GithubCorner
        href={'https://github.com/NirajanWEB'}
        bannerColor='#000'
        octoColor='#fff'
        size={100}
        direction='right'
        target='_blank'
        rel='noopener noreferrer'
      />

      <img
        src='https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100'
        alt='Messenger'
      />
      <h1>React Firebase Facebook Messenger Clone 🚀</h1>
      <h2>Welcome {username}</h2>

      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input
            className='app__input'
            placeholder='Enter a message...💭'
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className='app__iconButton'
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
