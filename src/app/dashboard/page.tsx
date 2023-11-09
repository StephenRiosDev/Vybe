import { Typography } from "@mui/material";

import { SpotifyService } from "../services/spotify.service";

export default function Dashboard() {

  SpotifyService
    .getSearchResults("The world is a vampire")
    .then( res => console.log("Dashboard results:", res) )
    .catch( err => console.log("Dashboard error:") )

  return (
    <>
      <Typography variant="h2">Welcome to Vybe!</Typography>
    </>
  )
}