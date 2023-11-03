import React from "react";

import { LoginForm } from "./components/loginForm/loginForm.component";

import "./page.scss";

export default function Home() {

  return (
    <>
      <section className="homePage">

        <div className="welcome">
          <h2>Hello There!</h2>
          <p>Welcome back!</p>
        </div>

         <LoginForm />
      </section>
    </>
  )
}