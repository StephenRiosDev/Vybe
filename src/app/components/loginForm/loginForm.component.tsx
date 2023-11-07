'use client';
import { FormEvent, useEffect, useState } from 'react';

import axios from "axios";
import { useRouter } from 'next/navigation';

import { TextField, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { UserService } from '@/app/services/user.service';
import { UserRegistration } from '@/app/models/user';

export const LoginForm = ({ redirectTo }: { redirectTo: string }) => {

  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    inputs: {
      username: {
        name: "username",
        label: "Username",
        value: "",
        type: "text",
        required: true,
        error: false
      },
      email: {
        name: "email",
        label: "Email",
        value: "",
        type: "text",
        required: true,
        error: false
      },
      firstName: {
        name: "firstName",
        label: "First Name",
        value: "",
        type: "text",
        required: true,
        error: false
      },
      lastName: {
        name: "lastName",
        label: "Last Name",
        value: "",
        type: "text",
        required: true,
        error: false
      },
      password: {
        name: "password",
        label: "Password",
        value: "",
        type: "password",
        required: true,
        error: false
      },
      passwordConfirm: {
        name: "passwordConfirm",
        label: "Confirm Password",
        value: "",
        type: "password",
        required: true,
        error: false
      }
    }
  })

  const resetFormErrors = (): void => {

    const inputs = { ...formData.inputs };

    for (const input of Object.values(inputs) as any) { input.error = false }

    setFormData({ ...formData, inputs: { ...formData.inputs, ...inputs } })
  }

  const updateForm = (name: string, value: string): void => {

    setFormData({
      ...formData,
      inputs: {
        ...formData.inputs,
        [name]: {
          ...formData.inputs[name],
          value: value
        }
      }
    })
  }

  const formIsValid = (): boolean => {

    const inputs = { ...formData.inputs };

    for (const input of Object.values(inputs) as any) {

      // If the input should be errored
      let isErrored = false;

      // Required validation
      if (input.required && input.value === "") isErrored = true;

      // Password validation
      if (isRegister && (input.name === "password" || input.name === "passwordConfirm")) {

        // The "other" password input
        const other = input.name === "password" ? formData.inputs.passwordConfirm : formData.inputs.password;

        // Errored if no match
        if (input.value !== other.value) isErrored = true;
      }

      // Email validation
      if (input.name === "email") {

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.value)) isErrored = true; // eslint-disable-line
      }

      // Set error state
      input.error = isErrored;
    }

    // Update the form data
    setFormData({ ...formData, inputs: { ...formData.inputs, ...inputs } })

    // Return of any of the inputs are errored
    return isRegister
      ? !Object.values(formData.inputs).map((input: any) => input.error).includes(true)
      : !Object.values({ username: formData.inputs.username, password: formData.inputs.password }).map(input => input.error).includes(true)
  }

  const getLoginData = (): { username: string, password: string } => {

    return { username: formData.inputs.username.value, password: formData.inputs.password.value }
  }

  const getRegistrationData = (): UserRegistration => {
    
    return formData.inputs.values.reduce((acc: any, cur: any) => ({ ...acc, [cur.name]: cur.value }), {})
  }

  const handleFormSubmit = async (e: FormEvent | void) => {

    e?.preventDefault();
    e?.stopPropagation();

    if (formIsValid()) {

      resetFormErrors();
      setError('');

      // Get the result of the login or registration from the user service
      UserService[( isRegister ? 'register' : 'login' )](isRegister ? getRegistrationData() as any : getLoginData() as any)
        .then( res => {
          
          // This should only happen if the call to login is successful
          if ( redirectTo ) router.push(redirectTo);
        })
        .catch( err => {

          // Set the error message to display to the user
          setError(err.response.data);
        })
    }
  }

  useEffect(() => {

    resetFormErrors();
  }, [isRegister])

  return (
    <>

      {/* Page Welcome */}
      <Grid container flexDirection="column" alignItems="right" mb={8}>
        <Typography variant="h2">{isRegister ? 'Registration' : 'Hello There!'}</Typography>
        <Typography color="primary.light">{isRegister ? "It's quick, easy, and free!" : 'Welcome back!'}</Typography>
      </Grid>

      <form onSubmit={ e => handleFormSubmit(e) }>

        {/* Login/Register Form */}
        <Grid container spacing={6} flexDirection="column" alignItems="center" minWidth="100%">

          {/* Inputs */}
          <Grid item minWidth="100%">
            <TextField
              label={isRegister ? "Desired Username" : "Username or Email"}
              name="user-name"
              value={formData.inputs.username.value}
              error={formData.inputs.username.error}
              onChange={e => updateForm("username", e.target.value)}
            />
          </Grid>

          {isRegister &&
            <>
              <Grid item minWidth="100%">
                <TextField
                  label="Email"
                  name="email"
                  value={formData.inputs.email.value}
                  error={formData.inputs.email.error}
                  onChange={e => updateForm("email", e.target.value)}
                />
              </Grid>

              <Grid item minWidth="100%">
                <TextField
                  label="First Name"
                  name="first-name"
                  value={formData.inputs.firstName.value}
                  error={formData.inputs.firstName.error}
                  onChange={e => updateForm("firstName", e.target.value)}
                />
              </Grid>

              <Grid item minWidth="100%">
                <TextField
                  label="Last Name"
                  name="last-name"
                  value={formData.inputs.lastName.value}
                  error={formData.inputs.lastName.error}
                  onChange={e => updateForm("lastName", e.target.value)}
                />
              </Grid>
            </>
          }

          <Grid item minWidth="100%">
            <TextField
              label="Password"
              type={passwordVisible ? 'text' : 'password'}
              value={formData.inputs.password.value}
              error={formData.inputs.password.error}
              onChange={e => updateForm("password", e.target.value)}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end" onClick={e => setPasswordVisible(!passwordVisible)}>
                    <Visibility />
                  </InputAdornment>,
              }}
            />
          </Grid>

          {isRegister &&
            <Grid item minWidth="100%">
              <TextField
                label="Confirm Password"
                type={passwordConfirmVisible ? 'text' : 'password'}
                value={formData.inputs.passwordConfirm.value}
                error={formData.inputs.passwordConfirm.error}
                onChange={e => updateForm("passwordConfirm", e.target.value)}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="end" onClick={e => setPasswordConfirmVisible(!passwordConfirmVisible)}>
                      <Visibility />
                    </InputAdornment>,
                }} />
            </Grid>
          }

          {/* Error */}
          {!!error &&
            <>
              <Typography mt={4}>{error}</Typography>
            </>
          }

          {/* Buttons */}
          <Grid item container flexDirection="row-reverse" justifyContent="space-between">
            <Grid item>
              <Button
                variant="vybe-right"
                type="submit"
                color={isRegister ? "secondary" : "primary"}
                onClick={ handleFormSubmit }
              >
                {isRegister ? 'Get Started' : "Let's Vibe"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={isRegister ? "vybe-left" : "vybe"}
                color={isRegister ? "primary" : "secondary"}
                onClick={e => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  )
}