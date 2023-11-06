import React from "react";

import { Grid, Typography } from "@mui/material";

import { LoginForm } from "./components/loginForm/loginForm.component";

export default function Home() {

  return (
    <>
      <Grid container justifyContent="center" component="section" className="homePage">

        <Grid container flexDirection="column" alignItems="center" width="80%" maxWidth="380px">

          <Grid item minWidth="100%">
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}