'use client';
import { useState } from 'react';

import { TextField, Button, Grid, InputAdornment } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export const LoginForm = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <Grid container spacing={6} flexDirection="column" alignItems="center" minWidth="100%">

        <Grid item minWidth="100%">
          <TextField label={ isRegister ? "Desired Username" : "Username"} name="user-name" />
        </Grid>

        { isRegister && 
          <>
            <Grid item minWidth="100%">
              <TextField label="Email" name="email" />
            </Grid>

            <Grid item minWidth="100%">
              <TextField label="First Name" name="first-name" />
            </Grid>

            <Grid item minWidth="100%">
              <TextField label="Last Name" name="last-name" />
            </Grid>
          </>
        }

        <Grid item minWidth="100%">
          <TextField label="Password" type={ passwordVisible ? 'text' : 'password'} InputProps={{
            endAdornment: 
              <InputAdornment position="end" onClick={ e => setPasswordVisible(!passwordVisible)}>
                <Visibility />
              </InputAdornment>,
          }} />
        </Grid>

        { isRegister &&
          <Grid item minWidth="100%">
            <TextField label="Confirm Password" type={ passwordConfirmVisible ? 'text' : 'password'} InputProps={{
              endAdornment: 
                <InputAdornment position="end" onClick={ e => setPasswordConfirmVisible(!passwordConfirmVisible)}>
                  <Visibility />
                </InputAdornment>,
            }} />
          </Grid>
        }

        <Grid item container flexDirection="row-reverse" justifyContent="space-between">
          <Grid item>
            <Button
              variant="vybe-right"
              color={ isRegister ? "secondary" : "primary" }
            >
              Let's Vibe
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant={ isRegister ? "vybe-left" : "vybe"} 
              color={ isRegister ? "primary" : "secondary" }
              onClick={ e=> setIsRegister(!isRegister) }
            >
              { isRegister ? "Login" : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}