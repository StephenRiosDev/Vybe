import { TextField, Button } from '@mui/material';

export const LoginForm = () => {

  return (
    <>
      <div className="loginForm">

        <TextField label="Username" />
        <Button variant="contained" color="secondary">Let's Vibe</Button>
      </div>
    </>
  )
}