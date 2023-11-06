import React from "react";

import { useRouter } from "next/router";

import { Grid } from "@mui/material";

import { LoginForm } from "./components/loginForm/loginForm.component";

export default function Home() {

  return (
    <>
      <Grid container justifyContent="center" component="section" className="homePage">

        <Grid container flexDirection="column" alignItems="center" width="80%" maxWidth="380px">

          <Grid item minWidth="100%">
            <LoginForm redirectTo="/dashboard" />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}