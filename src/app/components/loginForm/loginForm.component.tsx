'use client';
import { useState } from 'react';

import { TextField, Button, Grid, InputAdornment } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export const LoginForm = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <Grid container spacing={6} flexDirection="column" alignItems="center" minWidth="100%">

        <Grid item minWidth="100%">
          <TextField label="Username" />
        </Grid>

        <Grid item minWidth="100%">
          <TextField label="Password" type={ passwordVisible ? 'text' : 'password'} InputProps={{
            endAdornment: 
              <InputAdornment position="end" onClick={ e => setPasswordVisible(!passwordVisible)}>
                <Visibility />
              </InputAdornment>,
          }} />
        </Grid>

        <Grid item container flexDirection="row-reverse" justifyContent="space-between">
          <Grid item>
            <Button variant="vybe-right">Let's Vibe</Button>
          </Grid>
          <Grid item>
            <Button variant="vybe" color="secondary">Register</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}