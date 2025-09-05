import { useState, useContext } from 'react';
import ContextProvider from '../context/contextProvider';
import { Box, Button, FormControl, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setLoggedIn } = useContext(ContextProvider);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  console.log(username);
  console.log(password);
  const handleLogin = (username, password) => {
    if (!username || !password) {
      setErr({ message: 'Please enter a username and password.' });
      return;
    }

    fetch('http://localhost:3010/api/v0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setErr({
            message: 'Please enter a valid username and password',
          });
          return;
        }
        return res.json();
      })
      .then(
        (result) => {
          const token = result.accessToken;
          localStorage.setItem('authToken', token);
          setErr('');
          setLoggedIn(true);
          nav('/');
        },
        (error) => {
          setErr(error);
        }
      );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <FormControl>
        <TextField
          required
          aria-label="username"
          type="text"
          label="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          required
          aria-label="password"
          type="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      {err && <Box sx={{ color: 'red' }}>{err.message}</Box>}
      <Button
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={() => handleLogin(username, password)}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
