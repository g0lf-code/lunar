import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddPhotoAlternateIcon from '@mui/icons-material/AddAPhotoRounded';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Fab } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" to="/">
        Demo for InfoMind
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    file: null,
  });

  function _onChange(e) {
    setState({ ...state, [e?.target?.name]: e?.target?.value });
  }

  // async function SignUpUser(data) {
  //   try {
  //     const user = await axios({
  //       method: 'post',
  //       url: `http://localhost:4000/user/register`,
  //       data: data,
  //     });
  //     return user;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  const handleUploadClick = (event) => {
    console.log(event);
    console.log('upload trigger');
    const file = event.target.files[0];
    console.log(file);
    setState({ ...state, file: file });
    console.log(state);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:4000/user/signup';
    const formData = new FormData();
    for (let i in state) {
      console.log(i, state[i]);
      formData.append(i, state[i]);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response);
      if (response.status === 200) navigate('/');
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleUploadClick}
          />
          {
            <label htmlFor="contained-button-file">
              <Fab component="span">
                {state.file && (
                  <img
                    src={URL.createObjectURL(state.file)}
                    alt="profile-pic"
                    className="circle"
                  />
                )}
                {!state.file && <AddPhotoAlternateIcon />}
              </Fab>
            </label>
          }

          <Typography component="h1" variant="h5" style={{ marginTop: '4vh' }}>
            Sign up
          </Typography>
          <br />
          {/* <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          > */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={_onChange}
                  value={state.firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  // placeholder="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={_onChange}
                  value={state.lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={_onChange}
                  value={state.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={_onChange}
                  value={state.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={_onChange}
                  value={state.address}
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
